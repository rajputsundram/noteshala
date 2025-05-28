import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface UserPayload {
  user?: { isAdmin: boolean }; // `user` might be undefined
}

export async function middleware(req) {


  let token = req.cookies.get("token")?.value || req.headers.get("Authorization");



  if (!token) {
   
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Verify the JWT and cast payload to expected type
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET)) as { payload: UserPayload };

    console.log(" Decoded JWT Payload:", payload);

    if (!payload.user?.isAdmin) {
  
      return NextResponse.redirect(new URL("/", req.url), 302);
    }

    console.log(" Admin access granted");
    return NextResponse.next();
  } catch (error) {

    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: "/admin/:path*", // Apply middleware only to /admin routes
};
