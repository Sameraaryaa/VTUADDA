
import type { Metadata } from 'next';
import { allModelPapers } from '@/data/model-papers-initial';
import ModelPapersClientPage from '../model-papers-client-page';
import { notFound } from 'next/navigation';
import { BackButton } from '@/components/back-to-home-button';

type Props = {
    params: { scheme: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const schemeKey = params.scheme;
  const title = `${schemeKey.replace('-', ' ')} Model Question Papers`;
  const description = `Download official VTU model question papers for the ${schemeKey}.`;

  if (!allModelPapers[schemeKey]) {
    return {
      title: 'Scheme Not Found'
    }
  }

  return {
    title,
    description,
  }
}

export default function SchemeModelPapersPage({ params }: Props) {
  const { scheme } = params;
  const papers = allModelPapers[scheme];

  if (!papers) {
    notFound();
  }

  const title = `${scheme.replace('-', ' ')} Question Papers`;

  return (
    <div className="space-y-6">
        <BackButton />
        <ModelPapersClientPage papers={papers} title={title} />
    </div>
  );
}

export async function generateStaticParams() {
    return Object.keys(allModelPapers).map((scheme) => ({
        scheme: scheme,
    }));
}

    