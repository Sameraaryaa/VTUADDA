
import type { Metadata } from 'next';
import PyqClientPage from './pyq-client-page';
import { getSubjects, getBranches, getSchemes } from '@/lib/server-fetch';
import type { Note, Subject } from '@/lib/types';
import { PyqSchema } from './pyq-schema';
import { BackButton } from '@/components/back-to-home-button';

export interface PyqResult extends Note {
    subjectCode: string;
    subjectName: string;
    semester: number;
    branchIds: string[];
    scheme?: string;
}

export const metadata: Metadata = {
    title: "Search VTU Previous Year Question Papers (PYQs)",
    description: "Instantly search and find previous year question papers (PYQs) for all VTU subjects and branches. The best resource for exam preparation.",
};

export default async function PyqPage() {
    const [subjects, branches, schemes] = await Promise.all([
        getSubjects(),
        getBranches(),
        getSchemes()
    ]);

    const allPyqs: PyqResult[] = subjects.flatMap(subject => 
        (subject.pyqs || []).map(pyq => ({
            ...pyq,
            subjectCode: subject.code,
            subjectName: subject.name,
            semester: subject.semester,
            branchIds: subject.branch || [],
            scheme: subject.scheme,
        }))
    );

    return (
        <div className="space-y-6" data-ai-id="pyq-page-container">
            <BackButton />
            <PyqSchema pyqs={allPyqs} />
            <PyqClientPage allPyqs={allPyqs} branches={branches} schemes={schemes} />
        </div>
    );
}
