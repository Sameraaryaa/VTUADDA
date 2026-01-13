
"use client";

import Image from 'next/image';
import { Linkedin, Github, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo } from 'react';
import type { Author } from '@/lib/types';
import { BackButton } from '@/components/back-to-home-button';
import Script from 'next/script';

const AuthorSkeleton = () => (
    <Card className="overflow-hidden" data-ai-id="author-skeleton-card">
        <div className="md:grid md:grid-cols-12">
            <div className="md:col-span-4 p-4 flex items-center justify-center">
                <Skeleton className="relative w-48 h-48 rounded-full" data-ai-id="author-skeleton-image" />
            </div>
            <div className="md:col-span-8">
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" data-ai-id="author-skeleton-name" />
                    <Skeleton className="h-6 w-1/4" data-ai-id="author-skeleton-role" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" data-ai-id="author-skeleton-bio-1" />
                    <Skeleton className="h-4 w-5/6" data-ai-id="author-skeleton-bio-2" />
                    <div className="flex items-center gap-4 pt-2">
                        <Skeleton className="h-6 w-6 rounded-full" data-ai-id="author-skeleton-social-1" />
                        <Skeleton className="h-6 w-6 rounded-full" data-ai-id="author-skeleton-social-2" />
                        <Skeleton className="h-6 w-6 rounded-full" data-ai-id="author-skeleton-social-3" />
                    </div>
                </CardContent>
            </div>
        </div>
    </Card>
)

const AuthorSchema = ({ authors }: { authors: Author[] }) => {
    const personSchema = authors.map(author => ({
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        image: `https://vtuadda.com${author.imageUrl}`,
        url: 'https://vtuadda.com/authors',
        sameAs: [
            author.socials.linkedin,
            author.socials.github,
        ].filter(Boolean),
    }));

    const webpageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'About the vtuadda Team',
        description: 'Meet the passionate engineering students behind vtuadda, a one-stop resource hub for VTU academics.',
        url: 'https://vtuadda.com/authors',
        mainEntity: personSchema,
        publisher: {
            '@type': 'Organization',
            name: 'vtuadda',
            logo: {
                '@type': 'ImageObject',
                url: 'https://vtuadda.com/icon-512x512.png',
            }
        }
    };
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
            data-ai-id="authors-schema-script"
        />
    )
}

export default function AuthorProfilePageClient({ authors }: { authors: Author[] }) {
  const sortedAuthors = useMemo(() => {
    if (!authors) return [];
    const desiredOrder = ['sameer-arya', 'laxmi'];
    return [...authors].sort((a, b) => {
      const aIndex = desiredOrder.indexOf(a.id);
      const bIndex = desiredOrder.indexOf(b.id);

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex; // Both are in the desired order list
      }
      if (aIndex !== -1) {
        return -1; // a is in the list, b is not
      }
      if (bIndex !== -1) {
        return 1; // b is in the list, a is not
      }
      
      // Fallback for names not in desiredOrder
      return a.name.localeCompare(b.name);
    });
  }, [authors]);

  const isLoading = authors.length === 0;

  return (
    <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-0" data-ai-id="authors-page-container">
      <BackButton />
      <AuthorSchema authors={sortedAuthors} />
      <section className="text-center" data-ai-id="authors-intro-section">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold tracking-tight text-gradient animate-slide-in-from-top" data-ai-id="authors-main-heading">About vtuadda</h1>
        <div className="text-base sm:text-lg text-muted-foreground mt-4 space-y-4 max-w-4xl mx-auto animate-fade-in-up" data-ai-id="authors-intro-text">
            <p data-ai-id="authors-intro-p1">
                Welcome to vtuadda, an independent educational platform created by students, for students. Our mission is to provide comprehensive, accessible, and high-quality academic resources for students of Visvesvaraya Technological University (VTU).
            </p>
            <p data-ai-id="authors-intro-p2">
                As engineering students ourselves, we experienced firsthand the difficulty of finding reliable and organized study materials. This inspired us to build a centralized hub where students can easily find lecture notes, previous year question papers, lab manuals, and other essential resources to excel in their studies.
            </p>
             <p data-ai-id="authors-intro-p3">
                vtuadda is dedicated to supporting the academic journey of our peers by offering a user-friendly platform that saves time and enhances the learning experience. Our content is curated and managed by a dedicated team to ensure it is relevant and up-to-date with the VTU curriculum.
            </p>
        </div>
      </section>

      <section data-ai-id="authors-team-section">
        <h2 className="text-center text-3xl font-headline font-bold mb-8 text-gradient animate-fade-in-up" data-ai-id="authors-team-heading">Meet the Team</h2>
         <div className="space-y-10" data-ai-id="authors-list-container">
            {isLoading ? (
                [...Array(4)].map((_, i) => <AuthorSkeleton key={i} />)
            ) : (
                sortedAuthors.map((member, index) => (
                <Card key={member.id} className="overflow-hidden animate-fade-in-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1" data-ai-id={`author-card-${member.id}`}>
                    <div className="md:grid md:grid-cols-12 md:items-center">
                        <div className="md:col-span-4 p-4 flex items-center justify-center">
                            <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
                                <Image
                                    src={member.imageUrl}
                                    alt={`Profile picture of ${member.name}`}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={member.dataAiHint || 'person'}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-8">
                            <CardHeader>
                                <h3 className="text-2xl font-bold font-headline" data-ai-id={`author-name-${member.id}`}>{member.name}</h3>
                                <p className="text-primary font-semibold" data-ai-id={`author-role-${member.id}`}>{member.role}</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground" data-ai-id={`author-bio-${member.id}`}>{member.bio}</p>
                                <div className="flex items-center gap-4 pt-2" data-ai-id={`author-socials-${member.id}`}>
                                    {member.socials.linkedin && (
                                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-ai-id={`author-linkedin-${member.id}`}>
                                        <Linkedin className="w-6 h-6"/>
                                    </a>
                                    )}
                                    {member.socials.github && (
                                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" data-ai-id={`author-github-${member.id}`}>
                                        <Github className="w-6 h-6"/>
                                    </a>
                                    )}
                                    {member.socials.email && (
                                    <a href={`${member.socials.email}`} className="text-muted-foreground hover:text-primary transition-colors" data-ai-id={`author-email-${member.id}`}>
                                        <Mail className="w-6 h-6"/>
                                    </a>
                                    )}
                                </div>
                            </CardContent>
                        </div>
                    </div>
                </Card>
                ))
            )}
        </div>
      </section>
      
       <section className="text-center animate-fade-in-up" data-ai-id="authors-vision-section">
            <h2 className="text-3xl font-headline font-bold text-gradient" data-ai-id="authors-vision-heading">Our Vision</h2>
            <p className="text-base sm:text-lg text-muted-foreground mt-2 max-w-3xl mx-auto" data-ai-id="authors-vision-text">
                We believe that education should be accessible to all. vtuadda is more than just a website; it is a community-driven project built on the principle of students helping students. We are committed to continuously improving our platform, expanding our resource library, and introducing new tools to support your academic success.
                Thank you for being a part of our journey. Let's make the VTU journey better, together.
            </p>
       </section>
    </div>
  );
}
