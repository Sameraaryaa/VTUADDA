
"use client";

import EditSubjectClientPage from './edit-subject-client-page';
import { useParams } from 'next/navigation';

export default function EditSubjectPage() {
  const params = useParams();
  const subjectCode = params.subjectCode as string;

  return <EditSubjectClientPage subjectCode={decodeURIComponent(subjectCode)} />;
}
