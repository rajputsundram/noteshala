import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Importing from 'jose'

export async function middleware(req) {
    try {
        // 🔹 Get token from cookies or Authorization header
        let token = req.cookies.get("token")?.value || req.headers.get("Authorization");

        console.log("Token received in middleware:", token);

        // 🔹 Handle Bearer token from Authorization header
        if (token?.startsWith("Bearer ")) {
            token = token.split(" ")[1]; // Extract token after "Bearer "
            console.log("Token after extracting Bearer:", token);
        }

        // 🔹 If no token, redirect to login
        if (!token) {
            console.log("No token found. Redirecting to /login.");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // 🔹 Ensure JWT_SECRET is set
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // 🔹 Verify JWT Token using 'jose'
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        console.log("Decoded Token:", payload);

        // 🔹 Check if user is admin
        if (!payload.user?.isAdmin) {
            console.log("User is not an admin. Redirecting to /");
            return NextResponse.redirect(new URL("/", req.url));
        }

        // 🔹 Proceed to the next middleware or request handler
        return NextResponse.next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

// 🔹 Apply Middleware Only to Admin Pages
export const config = {
    matcher: "/admin/:path*",
};
