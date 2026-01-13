
"use client";

import type { Textbook } from "@/lib/types";

interface TextbooksSchemaProps {
    textbooks: Textbook[];
}

export const TextbooksSchema = ({ textbooks }: TextbooksSchemaProps) => {

    const collectionPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `VTU Engineering Textbook Library`,
        description: `Search and download recommended engineering textbooks for all subjects, branches, and semesters of Visvesvaraya Technological University (VTU).`,
        url: `https://vtuadda.com/textbooks`,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: textbooks.map((book, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                    '@type': 'Book',
                    name: book.title,
                    author: {
                        '@type': 'Person',
                        name: book.author
                    },
                    url: `https://vtuadda.com/textbooks`, // Canonical URL for the page about the book
                    learningResourceType: "Textbook"
                }
            }))
        }
    };

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
    );
};
