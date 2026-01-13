
import { getSubject, getBranchInfo } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import SubjectClientPage from './subject-client-page';
import type { Breadcrumb, Subject, Branch, Note } from '@/lib/types';
import type { Metadata, ResolvingMetadata } from 'next';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type SubjectPageProps = {
  params: {
    subjectCode: string;
  };
};

// Helper function to check if a subject has any content
const hasContent = (subject: Subject): boolean => {
  if (!subject) return false;
  // Ensure modules is an array before checking
  const modulesArray = Array.isArray(subject.modules)
    ? subject.modules
    : Object.values(subject.modules || {});
  
  const hasNotes = modulesArray.some(m => m && m.notes && m.notes.length > 0);
  const hasModelPapers = subject.modelQuestionPapers && subject.modelQuestionPapers.length > 0;
  const hasPyqs = subject.pyqs && subject.pyqs.length > 0;
  const hasLabs = subject.labs && subject.labs.length > 0;
  return hasNotes || hasModelPapers || hasPyqs || hasLabs;
};

const ComingSoonPage = ({ subject, branch }: { subject: Subject; branch: Branch | null }) => (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
       <div className="mb-4">
             <Button asChild variant="outline">
                <Link href={`/branch/${subject.branch?.[0] || 'first-year'}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Branch
                </Link>
            </Button>
        </div>
        <Card>
             <CardHeader className="p-6 bg-card rounded-xl border">
                <h1 className="text-2xl md:text-3xl font-bold text-gradient">
                    {subject.name}
                </h1>
                <p className="text-base md:text-lg font-code text-muted-foreground mt-1">
                    {subject.code}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                    <Badge variant="secondary">Semester: {subject.semester}</Badge>
                    {branch && <Badge variant="secondary">Branch: {branch.name}</Badge>}
                    {subject.credits > 0 && <Badge variant="secondary">Credits: {subject.credits}</Badge>}
                    {subject.scheme && <Badge variant="destructive">{subject.scheme}</Badge>}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-center py-16 text-muted-foreground bg-card border rounded-lg">
                    <Clock className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                    <h2 className="text-2xl font-semibold">Coming Soon!</h2>
                    <p className="mt-2 text-lg">Notes & materials for this subject will be updated very soon.</p>
                </div>
            </CardContent>
        </Card>
    </div>
);


export async function generateMetadata(
  { params }: SubjectPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    return {
      title: 'Subject Not Found',
      robots: {
        index: false, // Don't index pages for subjects that don't exist
      }
    };
  }

  // If the subject exists but has no content, mark it as noindex but allow following
  if (!hasContent(subject)) {
    return {
      title: `${subject.name} (${subject.code}) - Coming Soon`,
      robots: {
        index: false,
        follow: true, 
      },
    };
  }

  const title = `vtuadda ${subject.name} (${subject.code}) Notes, Syllabus & PYQs`;
  const description = `Find and download notes, syllabus, model question papers, and previous year question papers for the VTU subject ${subject.name} (${subject.code}). All materials for semester ${subject.semester}, organized by module.`;
  const url = `/subject/${subject.code}`;
  
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url: url,
    },
    twitter: {
      title,
      description,
    },
  };
}


export default async function SubjectPage({ params }: SubjectPageProps) {
  const subjectCode = decodeURIComponent(params.subjectCode);
  const subject = await getSubject(subjectCode);

  if (!subject) {
    notFound();
  }

  const primaryBranchId = subject.branch && subject.branch.length > 0 ? subject.branch[0] : 'first-year';
  const branchInfo = await getBranchInfo(primaryBranchId);

  if (!hasContent(subject)) {
    return <ComingSoonPage subject={subject} branch={branchInfo} />;
  }

  // --- Breadcrumb & Schema Generation Logic ---
  const breadcrumbs: Breadcrumb[] = [
    { name: 'Home', url: '/' },
  ];
  
  if (branchInfo) {
      breadcrumbs.push({ name: branchInfo.name, url: `/branch/${primaryBranchId}` });
  }

  breadcrumbs.push({ name: `Sem ${subject.semester}`, url: `/branch/${primaryBranchId}/sem-${subject.semester}` });
  breadcrumbs.push({ name: subject.name, url: `/subject/${subject.code}` });
  
  const subjectWithDetails: Subject = {
    ...subject,
    breadcrumbs,
    scheme: branchInfo?.scheme || subject.scheme || '2022 Scheme' // Ensure scheme is passed down
  }
  // --- End of Breadcrumb Logic ---

  return <SubjectClientPage subject={subjectWithDetails} branch={branchInfo} />;
}
