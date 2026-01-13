
import type { Metadata } from 'next';
import LabsClientPage from './labs-client-page';
import { LabsSchema } from './labs-schema';
import { getLabs, getBranches, getSchemes } from '@/lib/server-fetch';
import { BackButton } from '@/components/back-to-home-button';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "VTU Lab Manuals & Resources",
    description: "Search and download lab manuals and resources for all engineering branches and semesters of Visvesvaraya Technological University (VTU).",
};

export default async function LabsPage() {
    const [labs, branches, schemes] = await Promise.all([
        getLabs(),
        getBranches(),
        getSchemes()
    ]);
    return (
        <div className="space-y-6" data-ai-id="labs-page-container">
            <BackButton />
            <LabsSchema labs={labs} />
            <LabsClientPage labs={labs} branches={branches} schemes={schemes} />
        </div>
    );
}
