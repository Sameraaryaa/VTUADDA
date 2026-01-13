
import { getBranchInfo, getSubjectsForBranch } from '@/lib/server-fetch';
import { notFound } from 'next/navigation';
import BranchClientPage from '../branch-client-page';
import type { Metadata, ResolvingMetadata } from 'next';
import { BranchSchema } from '../branch-schema';

type BranchSemesterPageProps = {
  params: {
    branchId: string;
    semester: string;
  };
};

export async function generateMetadata(
  { params }: BranchSemesterPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const branchId = decodeURIComponent(params.branchId);
  const semesterSlug = decodeURIComponent(params.semester);
  const semester = parseInt(semesterSlug.replace('sem-', ''), 10);
  const branchInfo = await getBranchInfo(branchId);

  if (!branchInfo || isNaN(semester)) {
    return {
      title: 'Not Found',
       robots: {
        index: false,
      }
    };
  }

  const subjects = await getSubjectsForBranch(branchId, semester);
  if (subjects.length === 0) {
      return {
          title: `No subjects for Sem ${semester} in ${branchInfo.name}`,
          robots: {
              index: false, // Noindex if the page is empty
          }
      }
  }

  const title = `Sem ${semester} | VTU ${branchInfo.name} Notes`;
  const description = `Find all notes, question papers, and study materials for Semester ${semester} of ${branchInfo.name} (${branchInfo.scheme || ''}) at vtuadda.`;
  const url = `/branch/${branchId}/sem-${semester}`;
  
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

export default async function BranchSemesterPage({ params }: BranchSemesterPageProps) {
  const branchId = decodeURIComponent(params.branchId);
  const semesterSlug = decodeURIComponent(params.semester);
  const semesterNumber = parseInt(semesterSlug.replace('sem-', ''), 10);

  if (isNaN(semesterNumber)) {
      notFound();
  }

  const [branchInfo, allSubjects] = await Promise.all([
    getBranchInfo(branchId),
    getSubjectsForBranch(branchId, semesterNumber)
  ]);

  if (!branchInfo || allSubjects.length === 0) {
    notFound();
  }

  const filteredSubjects = [...allSubjects].sort((a, b) => (b.credits || 0) - (a.credits || 0));

  return (
    <>
      <BranchSchema branchInfo={branchInfo} subjects={allSubjects} branchId={branchId} />
      <BranchClientPage 
        branchId={branchId} 
        branchInfo={branchInfo} 
        subjects={filteredSubjects} 
        selectedSemester={semesterNumber} 
      />
    </>
  );
}

    