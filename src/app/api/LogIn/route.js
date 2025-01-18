import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { NextResponse } = require("next/server");

export async function POST(request, res) {
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
            },
        };
        const authToken = jwt.sign(data, jwtSecret, { expiresIn: "1h" }); // Token expires in 1 hour

        // Return a successful response with the token
        return NextResponse.json({
            success: true,
            msg: "Login successfully.",
            authToken,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        return NextResponse.json({
            success: false,
            msg: "An error occurred during login.",
            error: error.message,
        });
    }
}
