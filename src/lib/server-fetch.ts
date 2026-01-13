
import 'server-only';
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, query, where, orderBy, doc, QueryConstraint, Timestamp } from "firebase/firestore";
import type { Subject, Branch, Author, LinkCategory, LabResource, Textbook } from './types';
import { unstable_cache as cache } from 'next/cache';
import { schemes as localSchemes, branches as localBranches } from '@/data/subjects-initial';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getDb() {
    const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);
    if (!isFirebaseConfigured) {
        console.error("Firebase is not configured server-side.");
        return null;
    }

    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return getFirestore(app);
}

const fetchData = async <T>(collectionName: string, idField: string, q?: any): Promise<T[]> => {
  const db = getDb();
  if (!db) return [];
  const queryToExecute = q || query(collection(db, collectionName));
  const snapshot = await getDocs(queryToExecute);
  return snapshot.docs.map(doc => {
      const data = doc.data();
      // Firestore Timestamps need to be serialized for Next.js Server Component props
      for (const key in data) {
          if (data[key] instanceof Timestamp) {
              data[key] = { seconds: data[key].seconds, nanoseconds: data[key].nanoseconds };
          }
      }
      return { ...data, [idField]: doc.id } as T;
  });
};

const fetchCollectionAsMap = async <T>(collectionName: string): Promise<Record<string, T>> => {
  const db = getDb();
  if (!db) return {};
  const snapshot = await getDocs(query(collection(db, collectionName)));
  return Object.fromEntries(snapshot.docs.map(doc => [doc.id, doc.data() as T]));
}

// Cached fetch functions
const revalidate = 3600; // 1 hour

export const getSubjects = cache(async () => {
    const subjects = await fetchData<Subject>('subjects', 'code');
    const branches = await getBranches();
    
    // Enrich subjects with the scheme from their primary branch
    return subjects.map(subject => {
        const primaryBranchId = subject.branch?.[0] || 'first-year';
        const branchInfo = branches[primaryBranchId] || localBranches[primaryBranchId];
        return {
            ...subject,
            scheme: branchInfo?.scheme || "2022 Scheme" // Fallback scheme
        };
    });
}, ['subjects'], { revalidate });


export const getAuthors = cache(() => fetchData<Author>('authors', 'id'), ['authors'], { revalidate });
export const getTextbooks = cache(() => fetchData<Textbook>('textbooks', 'id'), ['textbooks'], { revalidate });
export const getBranches = cache(() => fetchCollectionAsMap<Branch>('branches'), ['branches'], { revalidate });
export const getLinkCategories = cache(async (): Promise<LinkCategory[]> => {
    const db = getDb();
    if (!db) return [];
    const categories = await fetchData<LinkCategory>('quickLinks', 'id', query(collection(db, 'quickLinks'), orderBy('order')));
    return categories;
}, ['link-categories'], { revalidate });


export const getLabs = cache(async (): Promise<LabResource[]> => {
    const db = getDb();
    if (!db) return [];

    const [standaloneLabs, allSubjects, allBranches] = await Promise.all([
        fetchData<LabResource>('labs', 'id'),
        getSubjects(),
        getBranches()
    ]);
    
    const labsFromSubjects: LabResource[] = allSubjects
        .filter(subject => subject.labs && subject.labs.length > 0)
        .map(subject => {
            const primaryBranchId = subject.branch && subject.branch.length > 0 ? subject.branch[0] : 'first-year';
            const branchInfo = allBranches[primaryBranchId];

            return {
                id: subject.code,
                subjectName: subject.name,
                subjectCode: subject.code,
                branchName: branchInfo ? branchInfo.name : 'Unknown',
                semester: subject.semester,
                manuals: subject.labs!,
            };
        });

    // Combine and remove duplicates, giving preference to standalone lab entries if codes match
    const combinedLabs = [...standaloneLabs, ...labsFromSubjects];
    const uniqueLabs = Array.from(new Map(combinedLabs.map(lab => [lab.subjectCode, lab])).values());

    return uniqueLabs.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
}, ['labs'], { revalidate });


export const getSchemes = cache(async (): Promise<string[]> => {
    // Return the hardcoded schemes from the initial data file
    return Promise.resolve(localSchemes);
}, ['schemes'], { revalidate });


// Fetch function for a single branch's subjects
export const getSubjectsForBranch = cache(async (branchId: string, semester?: number): Promise<Subject[]> => {
  const db = getDb();
  if (!db) return [];
  
  const constraints: QueryConstraint[] = [where('branch', 'array-contains', branchId)];

  if (semester) {
    constraints.push(where('semester', '==', semester));
  }

  const subjectsQuery = query(collection(db, 'subjects'), ...constraints);
  return fetchData<Subject>('subjects', 'code', subjectsQuery);
}, ['subjects-by-branch'], { revalidate });

// Fetch function for a single branch's info
export const getBranchInfo = cache(async (branchId: string): Promise<Branch | null> => {
    const db = getDb();
    if (!db) return null;
    const branchRef = doc(db, 'branches', branchId);
    const branchSnap = await getDoc(branchRef);
    return branchSnap.exists() ? branchSnap.data() as Branch : null;
}, ['branch-info'], { revalidate });


const serializeTimestamps = (data: any): any => {
    if (data instanceof Timestamp) {
        return { seconds: data.seconds, nanoseconds: data.nanoseconds };
    }
    if (Array.isArray(data)) {
        return data.map(serializeTimestamps);
    }
    if (data && typeof data === 'object') {
        const res: { [key: string]: any } = {};
        for (const key in data) {
            res[key] = serializeTimestamps(data[key]);
        }
        return res;
    }
    return data;
};

// Fetch function for a single subject
export const getSubject = cache(async (subjectCode: string): Promise<Subject | null> => {
    const db = getDb();
    if (!db) return null;
    const subjectRef = doc(db, "subjects", subjectCode);
    const docSnap = await getDoc(subjectRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        const serializedData = serializeTimestamps(data);
        return { ...serializedData, code: docSnap.id } as Subject;
    }
    return null;
}, ['subject-info'], { revalidate });

// Combined fetch for initial layout data - now includes all primary data.
export const getInitialData = cache(async () => {
    const [linkCategories, subjects, branches, schemes] = await Promise.all([
        getLinkCategories(),
        getSubjects(),
        getBranches(),
        getSchemes()
    ]);
    return { linkCategories, subjects, branches, schemes };
}, ['initial-data'], { revalidate });

