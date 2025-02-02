import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { NextResponse } = require("next/server");
import { cookies } from 'next/headers';

export async function POST(request) {
    const jwtSecret = process.env.JWT_SECRET; // Ensure this is defined in your environment variables

    try {
        // Connect to the database
        await ConnectDB();

        // Parse form data
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        // Check if the user exists
        let user = await Users.findOne({ email });
        if (!user) {
            return NextResponse.json({
                success: false,
                msg: "Invalid email or password.",
            });
        }

        // Compare the provided password with the hashed password
        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
            return NextResponse.json({
                success: false,
                msg: "Invalid email or password.",
            });
        }

        // Generate a JWT token
        const data = {
            user: {
                id: user["_id"],
                isAdmin: user.isAdmin, // Include admin status in the token
            },
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" }); // Token expires in 1 hour
        console.log(user.isAdmin);

        // Set token in HttpOnly cookie
        const response = NextResponse.json({
            success: true,
            msg: "Login successful.",
            redirect: user.isAdmin ? "/admin" : "/",
        });

        // Set the token in the cookie
        response.cookies.set("token", authToken, {
            httpOnly: true, // Prevent JavaScript access to the cookie
            secure: process.env.NODE_ENV === "production", // Secure flag for production (ensures cookies are only sent over HTTPS)
            maxAge: 3600, // Token expiration time in seconds (1 hour)
            path: "/", // Make the cookie available to the entire site
            sameSite: "Strict", // Strict same-site policy to prevent CSRF attacks
        });

        return response;
    } catch (error) {
        console.error("Error during login:", error.message);
        return NextResponse.json({
            success: false,
            msg: "An error occurred during login.",
            error: error.message,
        });
    }
}
