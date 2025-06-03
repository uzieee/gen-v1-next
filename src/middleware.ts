import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Redirect to '/onboarding' when requesting '/'
    if (pathname === `/`) {
        return NextResponse.redirect(new URL(`${pathname}onboarding/splash`, request.url));
    }
}
