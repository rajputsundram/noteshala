import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { NextResponse } from "next/server";
import otpStore from "../../../lib/Store/otp-store";

export async function POST(request) {
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

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP along with user details and an expiration (e.g., 5 minutes)
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
      userData: { name, email, department, password },
    });

    // Configure Nodemailer transporter using custom SMTP details
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // 
      port: Number(process.env.EMAIL_PORT), // e.g., 465
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    let mailOptions = {
      from:process.env.my_email,
      to: email,
      subject: "Verify Your Email - OTP",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };
console.log(otp)
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      msg: "OTP sent to your email. Please verify the OTP to complete signup.",
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ success: false, msg: "Signup failed", error: error.message });
  }
}
