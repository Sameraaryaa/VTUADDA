
import { getSubject } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import { SubjectResourcePage } from '../subject-resource-page';
import type { Metadata } from 'next';

type SubjectLabsPageProps = {
  params: {
    subjectCode: string;
  };
};

export async function generateMetadata({ params }: SubjectLabsPageProps): Promise<Metadata> {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    return { title: 'Not Found' };
  }

  const title = `Lab Manuals & Resources for ${subject.name} (${subject.code})`;
  const description = `Download all lab manuals for the VTU subject ${subject.name}.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vtuadda.com/subject/${subject.code}/labs`,
    },
  };
}

export default async function SubjectLabsPage({ params }: SubjectLabsPageProps) {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    notFound();
  }

  return (
    <article>
        <SubjectResourcePage subject={subject} resourceType="labs" />
    </article>
  );
}
