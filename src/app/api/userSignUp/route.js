import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
    let success = false;
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        console.error("JWT Secret is not defined in the environment variables.");
        return NextResponse.json({ success: false, msg: "Server configuration error." });
    }

    try {
        await ConnectDB();

        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const department = formData.get("department");
        const password = formData.get("password");

        if (!name || !email || !department || !password) {
            return NextResponse.json({ success: false, msg: "All fields are required." });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, msg: "Email is already registered." });
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            name,
            email,
            department,
            password: securePass,
        });

        const payload = {
            user: {
                id: newUser._id,
            },
        };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

        success = true;

        // Set the token in cookies
        const cookieStore = cookies();
        cookieStore.set("token", authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json({
            success: true,
            msg: "User registered successfully.",
            authToken,
        });

    } catch (error) {
        console.error("Error creating user:", error.message);
        return NextResponse.json({
            success: false,
            msg: "An error occurred during registration.",
            error: error.message,
        });
    }
}
