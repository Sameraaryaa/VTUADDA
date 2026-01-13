
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting || !isFirebaseConfigured}>
      {isSubmitting ? "Signing In..." : (
        <>
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </>
      )}
    </Button>
  );
}

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!auth) {
        toast({
            title: "Authentication service not available",
            description: "Firebase might not be configured correctly.",
            variant: "destructive",
        });
        return;
    }
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Redirecting to admin dashboard...",
      });
      router.push('/admin');
      router.refresh(); 

    } catch (error: any) {
       let errorMessage = "An unexpected error occurred.";
       switch (error.code) {
           case 'auth/invalid-credential':
           case 'auth/user-not-found':
           case 'auth/wrong-password':
               errorMessage = "Invalid email or password. Please try again.";
               break;
           case 'auth/network-request-failed':
                errorMessage = "Network error. Please check your internet connection.";
                break;
           case 'auth/api-key-not-valid':
                errorMessage = "Firebase API Key is not valid. Please check your configuration.";
                break;
           default:
               console.error("Firebase Auth Error: ", error);
       }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || !isFirebaseConfigured}
                autoComplete="email"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting || !isFirebaseConfigured}
                autoComplete="current-password"
                />
            </div>
            <SubmitButton isSubmitting={isSubmitting} />
        </form>
    </div>
  )
}

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    setIsClient(true);
    if (!isFirebaseConfigured) {
      toast({
        title: "Firebase Not Configured",
        description: "Please check your environment variables to configure Firebase.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Panel</CardTitle>
          <CardDescription>Enter your credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          {isClient ? (
            <LoginForm />
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="h-6 w-24 bg-muted rounded-md animate-pulse" />
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
              </div>
               <div className="space-y-2">
                <div className="h-6 w-24 bg-muted rounded-md animate-pulse" />
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
              </div>
              <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
