
"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Subject, Author, Branch, LinkCategory, LabResource, Textbook, Contribution, Feedback, Campaign } from './types';
import { db, isFirebaseConfigured } from './firebase';
import { collection, doc, getDocs, getDoc, query, setDoc, deleteDoc, writeBatch, orderBy, addDoc, updateDoc, arrayUnion, serverTimestamp, where, Timestamp, onSnapshot, arrayRemove } from 'firebase/firestore';

export interface AppState {
    subjects: Subject[];
    branches: Record<string, Branch>;
    authors: Author[];
    linkCategories: LinkCategory[];
    labs: LabResource[];
    textbooks: Textbook[];
    contributions: Contribution[];
    feedback: Feedback[];
    campaigns: Campaign[];
    schemes: string[];
    isLoading: boolean;
    isUnlocked: boolean;
    unlockExpiresAt: number | null;
    
    // Search and filter state
    searchTerm: string;
    selectedScheme: string;
    selectedBranch: string;
    selectedSemester: string;
    isSearchVisible: boolean;
    
    setSearchTerm: (term: string) => void;
    setSelectedScheme: (scheme: string) => void;
    setSelectedBranch: (branch: string) => void;
    setSelectedSemester: (semester: string) => void;
    toggleSearch: () => void;
    
    unlockContent: (hours: number) => void;
    checkUnlockStatus: () => void;
    getSubjectByCode: (code: string) => Subject | undefined;
    addSubject: (subject: Subject) => Promise<void>;
    updateSubject: (oldCode: string, subject: Subject) => Promise<void>;
    deleteSubject: (code: string) => Promise<void>;
    deleteMultipleSubjects: (codes: string[]) => Promise<void>;
    updateAuthor: (id: string, author: Author) => Promise<void>;
    addBranch: (id: string, branch: Omit<Branch, 'id'>) => Promise<void>;
    updateBranch: (id: string, branch: Omit<Branch, 'id'>) => Promise<void>;
    deleteBranch: (id: string) => Promise<void>;
    deleteMultipleBranches: (branchIds: string[]) => Promise<void>;
    addScheme: (scheme: string) => Promise<void>;
    updateLinkCategory: (id: string, category: Omit<LinkCategory, 'id'>) => Promise<void>;
    addLab: (lab: Omit<LabResource, 'id'>) => Promise<void>;
    updateLab: (id: string, lab: Omit<LabResource, 'id'>) => Promise<void>;
    deleteLab: (id: string) => Promise<void>;
    addCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
    updateCampaign: (id: string, campaign: Partial<Omit<Campaign, 'id'>>) => Promise<void>;
    deleteCampaign: (id: string) => Promise<void>;
    addTextbook: (textbook: Omit<Textbook, 'id'>) => Promise<void>;
    updateTextbook: (id: string, textbook: Omit<Textbook, 'id'>) => Promise<void>;
    deleteTextbook: (id: string) => Promise<void>;
    updateContributionStatus: (id: string, status: Contribution['status']) => Promise<void>;
    deleteContribution: (id: string) => Promise<void>;
    deleteFeedback: (id: string) => Promise<void>;
    initializeListeners: () => () => void;
}

const serializeData = (doc: any): any => {
    const data = doc.data();
    const serialized: { [key: string]: any } = {};
    for (const key in data) {
        if (data[key] instanceof Timestamp) {
            serialized[key] = { seconds: data[key].seconds, nanoseconds: data[key].nanoseconds };
        } else {
            serialized[key] = data[key];
        }
    }
    return { ...serialized, id: doc.id };
};


// Helper function to trigger cache revalidation
async function revalidateServerCache(tag: string) {
    if (typeof window !== 'undefined') {
        // This function is intended to be called from a client-side action (the admin panel)
        // It calls a server-side API route to perform the revalidation.
        await fetch('/api/revalidate?tag=' + tag, {
            method: 'POST',
        });
    }
}


export const useSubjectStore = create<AppState>()(
  persist(
    (set, get) => ({
      subjects: [],
      branches: {},
      authors: [],
      linkCategories: [],
      textbooks: [],
      labs: [],
      contributions: [],
      feedback: [],
      campaigns: [],
      schemes: [],
      isLoading: true,
      isUnlocked: true, // Always unlocked
      unlockExpiresAt: null,
      
      searchTerm: '',
      selectedScheme: '',
      selectedBranch: '',
      selectedSemester: '',
      isSearchVisible: false,

      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedScheme: (scheme) => set({ selectedScheme: scheme, selectedBranch: '', selectedSemester: '' }), // Reset dependent filters
      setSelectedBranch: (branch) => set({ selectedBranch: branch }),
      setSelectedSemester: (semester) => set({ selectedSemester: semester }),
      toggleSearch: () => set((state) => ({ isSearchVisible: !state.isSearchVisible })),

      unlockContent: (hours: number) => {
        // No-op: Content is always unlocked
        set({ isUnlocked: true, unlockExpiresAt: null });
      },

      checkUnlockStatus: () => {
        // No-op: Content is always unlocked
        if (!get().isUnlocked) {
          set({ isUnlocked: true });
        }
      },

      getSubjectByCode: (code) => {
          return get().subjects.find((s) => s.code === code);
      },

      addSubject: async (subject) => {
          if (!db) return;
          const { code, ...data } = subject;
          await setDoc(doc(db, "subjects", code), data);
          await revalidateServerCache('subjects');
          await revalidateServerCache('subjects-by-branch');
          await revalidateServerCache('initial-data');
      },

      updateSubject: async (oldCode, subject) => {
        if (!db) return;
        const { code: newCode, ...dataToSave } = subject;
        if (oldCode === newCode) {
            await setDoc(doc(db, "subjects", oldCode), dataToSave, { merge: true });
        } else {
            const batch = writeBatch(db);
            const oldDocRef = doc(db, "subjects", oldCode);
            const newDocRef = doc(db, "subjects", newCode);
            batch.delete(oldDocRef);
            batch.set(newDocRef, dataToSave);
            await batch.commit();
        }
        await revalidateServerCache('subjects');
        await revalidateServerCache('subjects-by-branch');
        await revalidateServerCache('subject-info');
        await revalidateServerCache('initial-data');
      },

      deleteSubject: async (code) => {
        if (!db) return;
        await deleteDoc(doc(db, "subjects", code));
        await revalidateServerCache('subjects');
        await revalidateServerCache('subjects-by-branch');
        await revalidateServerCache('initial-data');
      },

      deleteMultipleSubjects: async (codes) => {
          if (!db || codes.length === 0) return;
          const batch = writeBatch(db);
          codes.forEach(code => {
              const docRef = doc(db, "subjects", code);
              batch.delete(docRef);
          });
          await batch.commit();
          await revalidateServerCache('subjects');
          await revalidateServerCache('subjects-by-branch');
          await revalidateServerCache('initial-data');
      },
      
      updateAuthor: async (id, author) => {
        if (!db) return;
        const { id: authorId, ...authorData } = author;
        await setDoc(doc(db, "authors", authorId), authorData, { merge: true });
        await revalidateServerCache('authors');
        await revalidateServerCache('initial-data');
      },

      addBranch: async (id, branch) => {
          if (!db) return;
          await setDoc(doc(db, "branches", id), branch);
          await revalidateServerCache('branches');
          await revalidateServerCache('initial-data');
      },
      
      updateBranch: async (id, branch) => {
          if (!db) return;
          await setDoc(doc(db, "branches", id), branch, { merge: true });
          await revalidateServerCache('branches');
          await revalidateServerCache('branch-info');
          await revalidateServerCache('initial-data');
      },

      deleteBranch: async (id) => {
          if (!db) return;
          await deleteDoc(doc(db, "branches", id));
          await revalidateServerCache('branches');
          await revalidateServerCache('initial-data');
      },
      
      deleteMultipleBranches: async (branchIds) => {
          if (!db || branchIds.length === 0) return;
          const batch = writeBatch(db);
          const allSubjects = get().subjects;

          branchIds.forEach(branchId => {
              const affectedSubjects = allSubjects.filter(s => s.branch?.includes(branchId));
              affectedSubjects.forEach(subject => {
                  const subjectRef = doc(db, "subjects", subject.code);
                  batch.update(subjectRef, {
                      branch: arrayRemove(branchId)
                  });
              });

              const branchRef = doc(db, "branches", branchId);
              batch.delete(branchRef);
          });

          await batch.commit();
          await revalidateServerCache('branches');
          await revalidateServerCache('subjects');
          await revalidateServerCache('subjects-by-branch');
          await revalidateServerCache('initial-data');
      },

      addScheme: async (scheme) => {
          if (!db) return;
          const schemesDocRef = doc(db, 'meta', 'schemes');
          await updateDoc(schemesDocRef, {
              list: arrayUnion(scheme)
          });
          await revalidateServerCache('schemes');
          await revalidateServerCache('initial-data');
      },

      updateLinkCategory: async (id, category) => {
          if (!db) return;
          await setDoc(doc(db, "quickLinks", id), category, { merge: true });
          await revalidateServerCache('link-categories');
          await revalidateServerCache('initial-data');
      },

      addLab: async (lab) => {
          if (!db) return;
          const newLab = { ...lab, createdAt: serverTimestamp() };
          await addDoc(collection(db, 'labs'), newLab);
          await revalidateServerCache('labs');
      },

      updateLab: async (id, lab) => {
          if (!db) return;
          await updateDoc(doc(db, 'labs', id), lab);
          await revalidateServerCache('labs');
      },

      deleteLab: async (id) => {
          if (!db) return;
          await deleteDoc(doc(db, 'labs', id));
          await revalidateServerCache('labs');
      },

      addCampaign: async (campaign) => {
        if (!db) return;
        await addDoc(collection(db, 'campaigns'), { ...campaign, createdAt: serverTimestamp() });
      },
    
      updateCampaign: async (id, campaign) => {
        if (!db) return;
        await updateDoc(doc(db, 'campaigns', id), campaign);
      },
    
      deleteCampaign: async (id) => {
        if (!db) return;
        await deleteDoc(doc(db, 'campaigns', id));
      },

      addTextbook: async (textbook) => {
          if (!db) return;
          await addDoc(collection(db, 'textbooks'), textbook);
          await revalidateServerCache('textbooks');
      },

      updateTextbook: async (id, textbook) => {
          if (!db) return;
          await updateDoc(doc(db, 'textbooks', id), textbook);
          await revalidateServerCache('textbooks');
      },

      deleteTextbook: async (id) => {
          if (!db) return;
          await deleteDoc(doc(db, 'textbooks', id));
          await revalidateServerCache('textbooks');
      },
      
      updateContributionStatus: async (id, status) => {
          if(!db) return;
          await updateDoc(doc(db, 'contributions', id), { status });
      },

      deleteContribution: async (id) => {
          if (!db) return;
          await deleteDoc(doc(db, "contributions", id));
      },

      deleteFeedback: async (id) => {
          if (!db) return;
          await deleteDoc(doc(db, "feedback", id));
      },

      initializeListeners: () => {
          if (!isFirebaseConfigured || !db) {
              console.error("Firebase is not configured. Cannot initialize admin listeners.");
              set({ isLoading: false });
              return () => {};
          }

          set({ isLoading: true });
      
          const collectionsToListen = [
            { name: 'subjects', setter: 'subjects', idField: 'code' },
            { name: 'authors', setter: 'authors', idField: 'id' },
            { name: 'labs', setter: 'labs', idField: 'id' },
            { name: 'textbooks', setter: 'textbooks', idField: 'id' },
            { name: 'contributions', setter: 'contributions', idField: 'id', orderByField: 'createdAt' },
            { name: 'feedback', setter: 'feedback', idField: 'id', orderByField: 'createdAt' },
            { name: 'campaigns', setter: 'campaigns', idField: 'id', orderByField: 'createdAt' }
          ];
      
          const listeners = collectionsToListen.map(c => {
              const collQuery = c.orderByField
                  ? query(collection(db, c.name), orderBy(c.orderByField, 'desc'))
                  : query(collection(db, c.name));
              
              return onSnapshot(collQuery, snapshot => {
                  const items = snapshot.docs.map(serializeData);
                  set({ [c.setter]: items } as unknown as Partial<AppState>);
              });
          });
      
          // Special listeners for branches and schemes
          listeners.push(onSnapshot(query(collection(db, "branches")), snapshot => {
              const branches = Object.fromEntries(snapshot.docs.map(doc => [doc.id, serializeData(doc) as Branch]));
              set({ branches });
          }));
      
          listeners.push(onSnapshot(query(collection(db, "quickLinks"), orderBy("order")), snapshot => {
              const linkCategories = snapshot.docs.map(doc => serializeData(doc) as LinkCategory);
              set({ linkCategories });
          }));
      
          listeners.push(onSnapshot(doc(db, "meta", "schemes"), doc => {
              const schemes = doc.exists() ? doc.data()?.list : ["2022 Scheme", "2025 Scheme", "2018 Scheme"];
              set({ schemes });
          }));

          set({ isLoading: false });
          
          return () => {
              listeners.forEach(unsubscribe => unsubscribe());
          };
      },
    }),
    {
      name: 'vtu-adda-storage', 
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({ 
        isUnlocked: state.isUnlocked,
        unlockExpiresAt: state.unlockExpiresAt,
      }),
    }
  )
);
