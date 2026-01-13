
import type { Metadata } from 'next';
import { getAuthors } from '@/lib/server-fetch';
import AuthorProfilePageClient from './authors-client-page';

export const metadata: Metadata = {
  title: 'About The vtuadda Team',
  description: 'Meet the passionate engineering students behind vtuadda, a one-stop resource hub for VTU academics.',
};

export default async function AuthorProfilePage() {
  const authors = await getAuthors();

  return (
    <AuthorProfilePageClient authors={authors} />
  );
}

    