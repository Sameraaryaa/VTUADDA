
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { Button } from "@/components/ui/button";
import { Nav } from "./nav";
import Link from 'next/link';
import { useSubjectStore } from '@/lib/store';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push('/admin/login');
  };

  return (
     <div className="min-h-screen bg-muted/40">
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">
              <Link href="/admin">vtuadda - Admin Panel</Link>
            </h1>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
        </div>
      </header>
       <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5">
              <Nav />
          </aside>
          <main className="flex-1">
              {children}
          </main>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading, error] = useAuthState(auth!);
  const router = useRouter();
  const initializeListeners = useSubjectStore((state) => state.initializeListeners);

  useEffect(() => {
    // Set up real-time listeners for all admin data
    const unsubscribe = initializeListeners();
    // Clean up listeners when the component unmounts
    return () => unsubscribe();
  }, [initializeListeners]);


  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.error("Firebase is not configured. Redirecting to login.");
      router.push('/admin/login');
      return;
    }
    
    if (!loading) {
      if (error) {
        console.error("Auth error:", error);
        router.push('/admin/login');
      } else if (!user) {
        router.push('/admin/login');
      }
    }
  }, [user, loading, error, router]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="flex flex-col items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                <p className="text-lg font-semibold text-muted-foreground">Verifying Authentication...</p>
            </div>
        </div>
    );
  }

  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}
