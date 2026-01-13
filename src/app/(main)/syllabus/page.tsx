
import type { Metadata } from 'next';
import { syllabus2022 } from '@/data/syllabus-initial';
import SyllabusClientPage from './syllabus-client-page';
import { BackButton } from '@/components/back-to-home-button';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'VTU Scheme & Syllabus (2022 scheme and 2025 scheme)',
  description: 'Download official VTU scheme and syllabus documents for all engineering streams for the 2022 scheme.',
};

const syllabusSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "VTU Scheme & Syllabus (2022 & 2025)",
    "description": "Download official VTU scheme and syllabus documents for all engineering streams for the 2022 and 2025 schemes.",
    "url": "https://vtuadda.com/syllabus"
};

export default function SyllabusPage() {
  return (
    <div className="space-y-6" data-ai-id="syllabus-page-container">
        <Script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(syllabusSchema) }}
        />
        <BackButton />
        <SyllabusClientPage syllabi={syllabus2022} />
    </div>
  );
}
