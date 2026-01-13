
"use client";

import type { LabResource } from "@/lib/types";

interface LabsSchemaProps {
    labs: LabResource[];
}

export const LabsSchema = ({ labs }: { labs: LabResource[] }) => {
    let positionCounter = 0;

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `VTU Lab Manuals & Resources`,
        description: `Find and download lab manuals and related resources for all engineering branches and semesters of Visvesvaraya Technological University (VTU).`,
        url: `https://vtuadda.com/labs`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: labs.flatMap((lab) => 
                lab.manuals.map((manual) => {
                    positionCounter++;
                    return {
                        '@type': 'ListItem',
                        position: positionCounter,
                        item: {
                            '@type': 'LearningResource',
                            name: `${manual.name} - ${lab.subjectName} (${lab.subjectCode})`,
                            url: manual.url,
                            educationalLevel: `VTU Engineering ${lab.semester}th Semester`,
                            learningResourceType: "Lab Manual"
                        }
                    };
                })
            )
        }
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
    );
};
