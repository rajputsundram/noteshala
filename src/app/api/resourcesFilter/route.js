export const dynamic = "force-dynamic";
import { NextResponse } from "next/server"; // ✅ Import fixed!
import { ConnectDB } from "../../../lib/config/db";
import ResourcesModel from "../../../lib/models/ResourcesModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

// ✅ GET Resources API (Filtered by User's Email)
export async function GET() {
  try {
    await ConnectDB(); // Ensure DB connection

    // ✅ Extract token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
    }

    // ✅ Verify JWT Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT Verification Failed:", err);
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // ✅ Extract User Email
    const userEmail = decoded.user?.email;
    if (!userEmail) {
      return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
    }

    // ✅ Fetch only the resources belonging to this user
    const resources = await ResourcesModel.find({ email: userEmail });

    return NextResponse.json({ success: true, resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ DELETE Resource API
export async function DELETE(request) {
  try {
    await ConnectDB(); // Ensure DB connection

    // ✅ Extract ID from query parameters
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
    }

    // ✅ Find the resource
    const resource = await ResourcesModel.findById(id);
    if (!resource) {
      return NextResponse.json({ error: "Resource not found" }, { status: 404 });
    }

    // ✅ Delete associated image file if it exists
    if (resource.image) {
      const imagePath = path.join(process.cwd(), "public", resource.image);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting file:", err);
        }
      });
    }

    // ✅ Delete the resource from the database
    await ResourcesModel.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Resource Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting resource:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
