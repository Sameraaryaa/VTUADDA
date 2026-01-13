
import { getBranchInfo, getSubjectsForBranch } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import BranchClientPage from './branch-client-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { BranchSchema } from './branch-schema';

type BranchPageProps = {
  params: {
    branchId: string;
  };
};

export async function generateMetadata(
  { params }: BranchPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const branchId = decodeURIComponent(params.branchId);
  const branchInfo = await getBranchInfo(branchId);

  if (!branchInfo) {
    return {
      title: 'Branch Not Found',
      robots: {
        index: false,
      }
    };
  }
  
  const subjects = await getSubjectsForBranch(branchId);
  if (subjects.length === 0) {
    return {
      title: `No Subjects in ${branchInfo.name}`,
      robots: {
        index: false, // Noindex if there are no subjects
      },
    };
  }

  const title = `VTU ${branchInfo.name} Notes & Resources`;
  const description = `Find all notes, question papers, and study materials for ${branchInfo.name} (${branchInfo.scheme || ''}) at vtuadda. Organized by semester for your convenience.`;
  const url = `/branch/${branchId}`;
  
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

export default async function BranchPage({ params }: BranchPageProps) {
  const branchId = decodeURIComponent(params.branchId);
  
  const [branchInfo, allSubjects] = await Promise.all([
    getBranchInfo(branchId),
    getSubjectsForBranch(branchId)
  ]);

  if (!branchInfo) {
    notFound();
  }
  
  // Sort subjects by credits in descending order on the server
  const filteredSubjects = [...allSubjects].sort((a, b) => (b.credits || 0) - (a.credits || 0));

  return (
    <>
      <BranchSchema branchInfo={branchInfo} subjects={allSubjects} branchId={branchId} />
      <BranchClientPage branchId={branchId} branchInfo={branchInfo} subjects={filteredSubjects} />
    </>
  );
}
