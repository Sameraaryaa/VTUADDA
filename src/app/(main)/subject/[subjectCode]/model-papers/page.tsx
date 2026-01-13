
import { getSubject } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import { SubjectResourcePage } from '../subject-resource-page';
import type { Metadata } from 'next';

type SubjectModelPaperPageProps = {
  params: {
    subjectCode: string;
  };
};

export async function generateMetadata({ params }: SubjectModelPaperPageProps): Promise<Metadata> {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    return { title: 'Not Found' };
  }

  const title = `Model Question Papers for ${subject.name} (${subject.code})`;
  const description = `Download all model question papers for the VTU subject ${subject.name}.`;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vtuadda.com/subject/${subject.code}/model-papers`,
    },
  };
}

export default async function SubjectModelPaperPage({ params }: SubjectModelPaperPageProps) {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    notFound();
  }

  return (
    <article>
        <SubjectResourcePage subject={subject} resourceType="modelQuestionPapers" />
    </article>
  );
}
