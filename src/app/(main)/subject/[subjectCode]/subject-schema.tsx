
"use client";

import type { Subject, Note } from "@/lib/types";

const hasContent = (subject: Subject): boolean => {
  if (!subject) return false;
  const modulesArray = Array.isArray(subject.modules) ? subject.modules : Object.values(subject.modules || {});
  const hasNotes = modulesArray.some(m => m && m.notes && m.notes.length > 0);
  const hasModelPapers = subject.modelQuestionPapers && subject.modelQuestionPapers.length > 0;
  const hasPyqs = subject.pyqs && subject.pyqs.length > 0;
  const hasLabs = subject.labs && subject.labs.length > 0;
  return hasNotes || hasModelPapers || hasPyqs || hasLabs;
};

export const JsonLdSchema = ({ subject }: { subject: Subject }) => {
  if (!hasContent(subject)) {
    return null; // Don't render schema if there is no content
  }

  const learningResourceTypes = new Set<string>();
  const modulesArray = Array.isArray(subject.modules) ? subject.modules : Object.values(subject.modules || {});

  if (modulesArray.some(m => m && m.notes && m.notes.length > 0)) {
    learningResourceTypes.add('Notes');
  }
  if (subject.modelQuestionPapers && subject.modelQuestionPapers.length > 0) {
    learningResourceTypes.add('Question Paper');
  }
  if (subject.pyqs && subject.pyqs.length > 0) {
    learningResourceTypes.add('Question Paper');
  }
  if (subject.labs && subject.labs.length > 0) {
    learningResourceTypes.add('Lab Manual');
  }
  learningResourceTypes.add('Syllabus');


  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `vtuadda ${subject.name} (${subject.code}) Notes & Resources`,
    description: `Find comprehensive notes, model question papers, and previous year questions for the VTU subject ${subject.name} (${subject.code}), semester ${subject.semester}.`,
    url: `https://vtuadda.com/subject/${encodeURIComponent(subject.code)}`,
    provider: {
      '@type': 'Organization',
      name: 'vtuadda',
      url: 'https://vtuadda.com'
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
      },
    ],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      category: 'Free',
    },
    learningResourceType: Array.from(learningResourceTypes),
    syllabusSections: modulesArray.map(m => m?.name || `Module ${m?.moduleNumber}`).join(', '),
  };

  const breadcrumbSchema = subject.breadcrumbs && subject.breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: subject.breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://vtuadda.com${crumb.url}`
    }))
  } : null;

  return (
    <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
        {breadcrumbSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        )}
    </>
  );
};
