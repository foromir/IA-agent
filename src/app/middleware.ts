import { NextRequest, NextResponse } from 'next/server'
import { checkIsAuthenticated } from "@/app/lib/auth/checkIsAuthenticated"

// Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    const isLoggedIn = await checkIsAuthenticated();

    // Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    //  Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        isLoggedIn &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}