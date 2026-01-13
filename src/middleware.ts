
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // This middleware is currently empty as we are handling
  // authentication on the client-side within the layouts.
  return NextResponse.next();
}

export const config = {
  matcher: ['/udda/:path*', '/udda'],
};
