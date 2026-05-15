import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * MAINTENANCE MODE
 *
 * Set `MAINTENANCE_MODE=true` in `.env.local` (or host env) to lock the site.
 * Omit or set to anything other than `true` to serve the app normally.
 */
const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';

export function middleware(request: NextRequest) {
    // If maintenance mode is enabled
    if (MAINTENANCE_MODE) {
        // Allow access to the maintenance page itself and static assets
        if (
            request.nextUrl.pathname === '/maintenance' ||
            request.nextUrl.pathname.startsWith('/_next') ||
            request.nextUrl.pathname.startsWith('/images') ||
            request.nextUrl.pathname.startsWith('/favicon') ||
            request.nextUrl.pathname === '/dnd-guru-logo-512.png' ||
            request.nextUrl.pathname === '/site.webmanifest' ||
            request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp)$/)
        ) {
            return NextResponse.next();
        }

        // Redirect everything else to maintenance page
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes - optional, you can remove this if you want to block API too)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
