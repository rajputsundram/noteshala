import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    console.log("🚀 Middleware triggered for:", req.nextUrl.pathname);

    let token = req.cookies.get("token")?.value || req.headers.get("Authorization");
    

    console.log("🔍 Token Found:", token ? "✅ Yes" : "❌ No");

    if (!token) {
        console.log("🔴 No token, redirecting to /login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        // Verify the JWT
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        console.log("👤 Decoded JWT Payload:", payload);

        // Fix: Check inside payload.user
        if (!payload.user.isAdmin) {
            console.log("🔴 Not an admin, redirecting to /");
            return NextResponse.redirect(new URL("/", req.url), 302);
        }

        console.log("✅ Admin access granted");
        return NextResponse.next();
    } catch (error) {
        console.log("🔴 Invalid token, redirecting to /login");
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: "/admin/:path*", // Apply middleware only to /admin routes
};
