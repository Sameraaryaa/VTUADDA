
import 'dotenv/config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, getDocs, doc, setDoc } from 'firebase/firestore';
import { subjects as initialSubjects, branches as initialBranches } from '../data/subjects-initial';
import { authors as initialAuthors } from '../data/authors-initial';
import type { Subject, Branch, Author } from '../lib/types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// A function to check if all required environment variables are present
const checkFirebaseConfig = () => {
    const isConfigured = (
        firebaseConfig.apiKey &&
        firebaseConfig.authDomain &&
        firebaseConfig.projectId &&
        firebaseConfig.storageBucket &&
        firebaseConfig.messagingSenderId &&
        firebaseConfig.appId
    );
    if (!isConfigured) {
        console.error("🔴 Firebase configuration is missing! Check your .env file.");
        return false;
    }
    return true;
};

const initialQuickLinks = {
    "vtu-links": {
      title: "VTU Links",
      order: 1,
      links: [
        { text: "VTU Results", url: "https://results.vtu.ac.in/", external: true },
        { text: "VTU Circulars", url: "https://vtu.ac.in/en/category/circulars-notifications/", external: true },
        { text: "VTU Syllabus", url: "/syllabus", external: false },
        { text: "VTU Examination", url: "https://vtu.ac.in/en/category/examinations/", external: true },
        { text: "Model Papers", url: "/model-papers", external: false },
        { text: "Academic Calendar", url: "https://vtu.ac.in/en/academic-calendar/", external: true },
      ],
    },
    "quick-links": {
      title: "Quick Links",
      order: 2,
      links: [
        { text: "First Year", url: "/branch/first-year", external: false },
        { text: "CSE / ISE", url: "/branch/cse", external: false },
        { text: "AIML / DS", url: "/branch/aiml", external: false },
        { text: "Notes Enquiry", url: "/upload", external: false },
        { text: "SGPA Calculator", url: "/calculator", external: false },
        { text: "CGPA Calculator", url: "/calculator", external: false },
      ],
    },
    "about": {
      title: "About vtuadda",
      order: 3,
      links: [
          { text: "FAQ", url: "/faq", external: false },
          { text: "About Us", url: "/authors", external: false },
          { text: "Disclaimer", url: "/disclaimer", external: false },
          { text: "Contact Us", url: "/#contact", external: false },
          { text: "Privacy Policy", url: "/privacy", external: false },
          { text: "Terms & Conditions", url: "/terms", external: false },
      ]
    }
};

async function seedDatabase() {
  if (!checkFirebaseConfig()) {
    process.exit(1);
  }

  console.log("🟢 Initializing Firebase app...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const subjectsCollection = collection(db, 'subjects');
  const branchesCollection = collection(db, 'branches');
  const quickLinksCollection = collection(db, 'quickLinks');
  const authorsCollection = collection(db, 'authors');


  try {
    // Seed branches NON-DESTRUCTIVELY
    console.log(`🌱 Upserting ${Object.keys(initialBranches).length} branches (non-destructive)...`);
    const branchesBatch = writeBatch(db);
    for (const [id, branchData] of Object.entries(initialBranches)) {
      const branchRef = doc(branchesCollection, id);
      branchesBatch.set(branchRef, branchData, { merge: true });
    }
    await branchesBatch.commit();
    console.log("✅ Branches upserted successfully. Your admin changes and likes are safe.");

    // Seed subjects NON-DESTRUCTIVELY
    console.log(`🌱 Upserting ${initialSubjects.length} subjects (non-destructive)...`);
    const existingSubjectsSnapshot = await getDocs(subjectsCollection);
    const existingSubjectsMap = new Map(existingSubjectsSnapshot.docs.map(d => [d.id, d.data() as Subject]));
    
    const subjectsBatch = writeBatch(db);
    
    initialSubjects.forEach((subject: Subject) => {
        const { code, ...subjectData } = subject;
        const subjectRef = doc(subjectsCollection, code);
        const existingSubject = existingSubjectsMap.get(code);

        let dataToSet: Partial<Subject>;

        if (existingSubject) {
            // If subject exists, only update core fields, PRESERVE user-added content like notes.
            dataToSet = {
                name: subjectData.name,
                credits: subjectData.credits,
                semester: subjectData.semester,
                branch: subjectData.branch,
                scheme: subjectData.scheme,
                type: subjectData.type
            };
        } else {
            // If subject is new, add it with its full initial data.
            dataToSet = { ...subjectData };
             // Ensure modules array exists and is properly structured for new subjects
            dataToSet.modules = Array.from({ length: 5 }, (_, i) => {
                const moduleNumber = i + 1;
                const existingModule = (subject.modules || []).find(m => m.moduleNumber === moduleNumber);
                return {
                    moduleNumber,
                    name: existingModule?.name || '',
                    description: existingModule?.description || '',
                    notes: existingModule?.notes || [],
                };
            });
            
            if (!dataToSet.textbooks) dataToSet.textbooks = [];
            if (!dataToSet.labs) dataToSet.labs = [];
            if (!dataToSet.modelQuestionPapers) dataToSet.modelQuestionPapers = [];
            if (!dataToSet.pyqs) dataToSet.pyqs = [];
        }

        subjectsBatch.set(subjectRef, dataToSet, { merge: true });
    });
    
    await subjectsBatch.commit();
    console.log("✅ Subjects upserted successfully. Your manually added notes are safe.");


    // Seed Quick Links NON-DESTRUCTIVELY
    console.log(`🌱 Upserting ${Object.keys(initialQuickLinks).length} quick link categories (non-destructive)...`);
    const quickLinksBatch = writeBatch(db);
    for (const [id, linkData] of Object.entries(initialQuickLinks)) {
        const linkRef = doc(quickLinksCollection, id);
        quickLinksBatch.set(linkRef, linkData, { merge: true });
    }
    await quickLinksBatch.commit();
    console.log("✅ Quick links upserted successfully. Your admin changes are safe.");

    // Seed Authors NON-DESTRUCTIVELY (only adds new authors)
    console.log(`🌱 Seeding new authors (non-destructive)...`);
    const existingAuthorsSnapshot = await getDocs(authorsCollection);
    const existingAuthorIds = new Set(existingAuthorsSnapshot.docs.map(d => d.id));
    
    const authorsBatch = writeBatch(db);
    let newAuthorsCount = 0;
    initialAuthors.forEach((author: Author) => {
        if (!existingAuthorIds.has(author.id)) {
            const { id, ...authorData } = author;
            const authorRef = doc(authorsCollection, id);
            authorsBatch.set(authorRef, authorData);
            newAuthorsCount++;
        }
    });

    if (newAuthorsCount > 0) {
        await authorsBatch.commit();
        console.log(`✅ ${newAuthorsCount} new authors seeded successfully. Existing authors were not modified.`);
    } else {
        console.log("✅ No new authors to seed. All existing authors are preserved.");
    }

    console.log("\n🎉 Database seeding complete!");
    
  } catch (e) {
    console.error("❌ Error seeding database:", e);
  } finally {
    // Firebase doesn't need an explicit close in v9 for client SDK
    console.log("👋 Script finished.");
    process.exit(0);
  }
}

seedDatabase();
