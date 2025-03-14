import Users from "../../../lib/models/Users";
import { ConnectDB } from "../../../lib/config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import otpStore from "../../../lib/Store/otp-store";

export async function POST(request) {
  try {
    await ConnectDB();
    const { email, enteredOtp } = await request.json();

    if (!email || !enteredOtp) {
      return NextResponse.json({ success: false, msg: "Email and OTP are required." });
    }

    // Normalize the email to avoid case-sensitivity issues.
    const emailKey = email.toLowerCase();

    // Retrieve OTP data from the in-memory store.
    const otpData = otpStore.get(emailKey);
    console.log("Stored OTP Data:", otpData);

    // If OTP is not found, it might have expired or never been stored.
    if (!otpData) {
      return NextResponse.json({ success: false, msg: "OTP not found or expired." });
    }

    // Check if the OTP has expired.
    if (Date.now() > otpData.expiresAt) {
      otpStore.delete(emailKey); // Remove expired OTP.
      return NextResponse.json({ success: false, msg: "OTP expired." });
    }

    // Validate the entered OTP against the stored value.
    if (otpData.otp !== enteredOtp) {
      return NextResponse.json({ success: false, msg: "Invalid OTP." });
    }

    // OTP is valid—proceed to create the user.
    const { name, department, password } = otpData.userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email: emailKey,
      department,
      password: hashedPassword,
    });

    // Generate a JWT token for the new user.
    const payload = { user: { id: newUser._id } };
    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Remove the OTP data after successful verification.
    otpStore.delete(emailKey);

    // Set the JWT token in cookies.
    const response = NextResponse.json({ success: true, msg: "User registered successfully." });
    response.cookies.set("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
      sameSite: "Strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ success: false, msg: "OTP verification failed", error: error.message });
  }
}
