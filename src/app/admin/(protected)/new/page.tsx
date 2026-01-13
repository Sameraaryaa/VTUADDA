
"use client";

import { useRouter } from "next/navigation";
import { SubjectForm } from "@/components/subject-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NewSubjectPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <Button variant="outline" onClick={() => router.push('/admin')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Subjects
        </Button>
      </div>
      <SubjectForm />
    </div>
  );
}
