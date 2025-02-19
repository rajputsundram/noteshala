import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
    try {
        // Get token from cookies
        const token = request.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ success: false, msg: "No token provided" }, { status: 401 });
        }

        // Verify and decode JWT
        const jwtSecret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, jwtSecret);

        return NextResponse.json({
            success: true,
            isAdmin: decoded.user.isAdmin, // Send back admin status
        });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Invalid token" }, { status: 401 });
    }
}
