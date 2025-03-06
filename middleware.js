import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    try {
        // Debug: Log request URL
        console.log('Middleware running on:', request.nextUrl.pathname);

        // Retrieve token from request cookies
        const token = request.cookies.get('token')?.value;
        console.log('Token in middleware:', token);

        if (!token) {
            console.log('No token found, redirecting to home');
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Verify JWT token using jose
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const decoded = await jwtVerify(token, secret);
            
            console.log('Token verified:', decoded);
        } catch (err) {
            console.log('JWT Verification Error:', err.message);
            setShowSignup(true);
            return NextResponse.redirect(new URL('/', request.url));
        }
        
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/', request.url));
    }
}

// Apply middleware to all routes under /service/
export const config = {
    matcher: ['/service/:path*'],
};
