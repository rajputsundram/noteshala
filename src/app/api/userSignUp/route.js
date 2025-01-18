import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const { NextResponse } = require("next/server");

export async function POST(request) {
    let success = false;
    const jwtSecret = process.env.JWT_SECRET; //access it from the environment

    if (!jwtSecret) {
        console.error("JWT Secret is not defined in the environment variables.");
        return NextResponse.json({ success: false, msg: "Server configuration error." });
    }

    try {
        // Connect to the database
        await ConnectDB();

        // Parse form data
        const formData = await request.formData();
        const name = formData.get("name");
        const email = formData.get("email");
        const department = formData.get("department");
        const password = formData.get("password");

        // Input validation
        if (!name || !email || !department || !password) {
            return NextResponse.json({ success: false, msg: "All fields are required." });
        }

        // Check if the email is already registered
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, msg: "Email is already registered." });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(password, salt);

        // Create the user in the database
        const newUser = await Users.create({
            name,
            email,
            department,
            password: securePass,
        });
        console.log("User created successfully:", newUser);

        // Generate JWT token
        const payload = {
            user: {
                id: newUser._id,
            },
        };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" }); // Token expires in 1 hour

        success = true;

        // Return a successful response with the token
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
