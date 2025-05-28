import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // ✅ Import cookies

export async function POST(request) {
    try {
        await ConnectDB();
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        const user = await Users.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ success: false, msg: "Invalid email or password." }, { status: 401 });
        }

        //  Generate JWT
        const payload = { user: { id: user._id, email: user.email, isAdmin: user.isAdmin } };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

        //  Create response first
        const response = NextResponse.json({
            success: true,
            msg: "Login successful.",
            redirect: user.isAdmin ? "/admin" : "/",
        });

        //  Correctly set cookie
        cookies().set("token", authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3600, // 1 hour
            path: "/",
            sameSite: "Lax", 
        });

        return response;

    } catch (error) {
        return NextResponse.json({ success: false, msg: "Login failed", error: error.message }, { status: 500 });
    }
}
