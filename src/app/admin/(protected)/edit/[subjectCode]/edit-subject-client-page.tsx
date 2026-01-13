
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSubjectStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SubjectForm } from "@/components/subject-form";

export default function EditSubjectClientPage({ subjectCode }: { subjectCode: string }) {
  const router = useRouter();
  const { getSubjectByCode } = useSubjectStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const subject = getSubjectByCode(subjectCode);

  useEffect(() => {
    if (isClient && !subject) {
       // Optionally handle subject not found, e.g., redirect or show message
       // router.push('/admin'); 
    }
  }, [subject, router, isClient]);

  if (!isClient) {
    return <div>Loading...</div>; // Or a skeleton loader
  }
  
  if (!subject) {
    return <div>Subject not found. It might have been deleted. <Button variant="link" onClick={() => router.push('/admin')}>Go back to admin</Button></div>
  }

  return (
    <div className="space-y-6">
       <div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subjects
        </Button>
      </div>
      <SubjectForm subject={subject} />
    </div>
  );
}
