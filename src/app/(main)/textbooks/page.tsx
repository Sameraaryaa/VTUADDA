
import type { Metadata } from 'next';
import TextbooksClientPage from './textbooks-client-page';
import { getTextbooks } from '@/lib/server-fetch';
import { TextbooksSchema } from './textbooks-schema';
import { BackButton } from '@/components/back-to-home-button';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "VTU Engineering Textbook Library | All Branches",
    description: "Search and find recommended engineering textbooks for all subjects, branches, and semesters of Visvesvaraya Technological University (VTU).",
};

export default async function TextbooksPage() {
    const textbooks = await getTextbooks();
    return (
        <div className="space-y-6" data-ai-id="textbooks-page-container">
            <BackButton />
            <TextbooksSchema textbooks={textbooks} />
            <TextbooksClientPage textbooks={textbooks} />
        </div>
    );
}
