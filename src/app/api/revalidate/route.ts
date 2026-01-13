
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// This API route is a simple way to trigger on-demand revalidation.
// It's intentionally kept simple. In a production environment, you'd want
// to secure this endpoint, for example, by checking for a secret key.
export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get('tag');

  if (!tag) {
    return NextResponse.json({ error: 'Missing tag param' }, { status: 400 });
  }

  try {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error(`Error revalidating tag "${tag}":`, error);
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
