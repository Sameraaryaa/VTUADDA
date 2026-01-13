
"use client";

import type { Branch, Subject } from "@/lib/types";

interface BranchSchemaProps {
    branchInfo: Branch;
    subjects: Subject[];
    branchId: string;
    selectedSemester?: number;
}

export const BranchSchema = ({ branchInfo, subjects, branchId, selectedSemester }: BranchSchemaProps) => {

    const semesterPath = selectedSemester ? `/sem-${selectedSemester}` : '';
    const pageUrl = `https://vtuadda.com/branch/${branchId}${semesterPath}`;
    const pageName = selectedSemester 
        ? `Sem ${selectedSemester} | VTU ${branchInfo.name} Notes`
        : `VTU ${branchInfo.name} Notes & Resources`;
    const pageDescription = selectedSemester
        ? `All study materials for Semester ${selectedSemester} of ${branchInfo.name} (${branchInfo.scheme || ''}).`
        : `A collection of all notes, question papers, and syllabi for ${branchInfo.name} (${branchInfo.scheme || ''}).`;

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageName,
        description: pageDescription,
        url: pageUrl,
        about: {
            '@type': 'Thing',
            name: branchInfo.name
        },
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: subjects.map((subject, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Course',
                    name: `${subject.name} (${subject.code})`,
                    description: `Study materials and notes for ${subject.name} - ${subject.code}.`,
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
                      category: 'Free'
                    }
                }
            }))
        }
    };

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: branchInfo.name, url: `/branch/${branchId}` }
    ];
    if (selectedSemester) {
        breadcrumbs.push({ name: `Sem ${selectedSemester}`, url: pageUrl });
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `https://vtuadda.com${crumb.url}`
        }))
    };

    return (
        <>
            {subjects.length > 0 && 
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
            }
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
    );
};
