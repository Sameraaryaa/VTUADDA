
import { MetadataRoute } from 'next'
import { getBranches, getSubjects } from '@/lib/server-fetch';
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vtuadda.com';
  const lastModified = new Date();

  // 1. Static pages with priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/authors`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/calculator`, lastModified, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/download`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/labs`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/model-papers`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/syllabus`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/pyq`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/textbooks`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/upload`, lastModified, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const branches = await getBranches();
  const allSubjects = await getSubjects();

  // 2. Dynamic branch and semester pages
  const branchRoutes: MetadataRoute.Sitemap = [];
  
  Object.keys(branches).forEach(branchId => {
    // Add the main branch page
    branchRoutes.push({
        url: `${baseUrl}/branch/${branchId}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.9,
    });
    // Add a page for each semester within the branch that actually has subjects
    const semestersWithSubjects = new Set(
        allSubjects.filter(s => s.branch?.includes(branchId))
        .map(s => s.semester)
    );

    semestersWithSubjects.forEach(semester => {
        branchRoutes.push({
            url: `${baseUrl}/branch/${branchId}/sem-${semester}`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.85,
        });
    });
  });

  // 3. Dynamic subject pages and their resource sub-pages
  const subjectRoutes: MetadataRoute.Sitemap = [];
  allSubjects.forEach((subject) => {
    const subjectUrl = `${baseUrl}/subject/${encodeURIComponent(subject.code)}`;
    // Main subject page
    subjectRoutes.push({
      url: subjectUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    // Resource sub-pages
    if (subject.modelQuestionPapers && subject.modelQuestionPapers.length > 0) {
      subjectRoutes.push({ url: `${subjectUrl}/model-papers`, lastModified, changeFrequency: 'monthly', priority: 0.75 });
    }
    if (subject.pyqs && subject.pyqs.length > 0) {
      subjectRoutes.push({ url: `${subjectUrl}/pyqs`, lastModified, changeFrequency: 'monthly', priority: 0.75 });
    }
    if (subject.labs && subject.labs.length > 0) {
      subjectRoutes.push({ url: `${subjectUrl}/labs`, lastModified, changeFrequency: 'monthly', priority: 0.75 });
    }
  });

  // 4. Dynamic branch textbook pages
  const branchTextbookRoutes = Object.entries(branches)
    .filter(([, branchData]) => branchData.textbooks && branchData.textbooks.length > 0)
    .map(([branchId]) => ({
        url: `${baseUrl}/branch/${branchId}/textbooks`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.6,
    }));
 
  return [...staticRoutes, ...branchRoutes, ...subjectRoutes, ...branchTextbookRoutes];
}
