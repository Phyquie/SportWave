import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
    try {
        // Debug: Log request URL

        // Retrieve token from request cookies
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Verify JWT token using jose
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const decoded = await jwtVerify(token, secret);

        } catch (err) {
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
    matcher: ['/services/:path*'],
};
