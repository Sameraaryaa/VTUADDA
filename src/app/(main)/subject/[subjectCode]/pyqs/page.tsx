
import { getSubject } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import { SubjectResourcePage } from '../subject-resource-page';
import type { Metadata } from 'next';

type SubjectPyqPageProps = {
  params: {
    subjectCode: string;
  };
};

export async function generateMetadata({ params }: SubjectPyqPageProps): Promise<Metadata> {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    return { title: 'Not Found' };
  }

  const title = `Previous Year Questions (PYQs) for ${subject.name} (${subject.code})`;
  const description = `Download all PYQs for the VTU subject ${subject.name}.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vtuadda.com/subject/${subject.code}/pyqs`,
    },
  };
}

export default async function SubjectPyqPage({ params }: SubjectPyqPageProps) {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    notFound();
  }

  return (
    <article>
      <SubjectResourcePage subject={subject} resourceType="pyqs" />
    </article>
  );
}
