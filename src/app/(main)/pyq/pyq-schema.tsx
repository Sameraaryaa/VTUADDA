
"use client";

import type { Note } from "@/lib/types";

interface PyqResult extends Note {
    subjectCode: string;
    subjectName: string;
    semester: number;
}

interface PyqSchemaProps {
    pyqs: PyqResult[];
}

export const PyqSchema = ({ pyqs }: PyqSchemaProps) => {

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `VTU Previous Year Question Papers (PYQs)`,
        description: `Search and download previous year question papers for all VTU engineering subjects.`,
        url: `https://vtuadda.com/pyq`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: pyqs.map((pyq, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'LearningResource',
                    name: `${pyq.name} - ${pyq.subjectName} (${pyq.subjectCode})`,
                    url: pyq.url,
                    educationalLevel: `VTU Engineering ${pyq.semester}th Semester`,
                    learningResourceType: "Question Paper"
                }
            }))
        }
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
    );
};
