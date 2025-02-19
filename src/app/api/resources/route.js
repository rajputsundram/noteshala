
export const dynamic = "force-dynamic";
import {ConnectDB} from '../../../lib/config/db'
import {writeFile}  from 'fs/promises'
import ResourcesModel from '../../../lib/models/ResourcesModel'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { title } from "process";
import fs from 'fs';
import path from 'path';

const { NextResponse } = require("next/server");
const LoadDB=async()=>{
    await ConnectDB()
}
LoadDB();

 
// API  Endpoint get all resources


export async function GET(request) {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const department = url.searchParams.get("department");
    const category = url.searchParams.get("category");


    // Prepare query object based on received params
    let query = {};
    if (year) query.year = year;
    if (department) query.department = department;
    if (category) query.category = category;

  

    // Fetch resources from the database based on the query
    const resources = await ResourcesModel.find(query);

    // Debugging log: Check the number of resources found
    console.log("Found resources:", resources.length);

    if (resources.length === 0) {
      return NextResponse.json({ message: "No resources found for the given parameters" }, { status: 404 });
    }

    // Return resources as a response
    return NextResponse.json({ resources });

  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}




const SECRET_KEY = process.env.JWT_SECRET; 

export async function POST(request) {
    try {
        const formData = await request.formData();
        const timestamp = Date.now();

        // ✅ Fetch cookies correctly
        const cookieStore = cookies();
        console.log("All Cookies:", cookieStore.getAll());

        const token = cookieStore.get("token")?.value;
        console.log("Extracted Token:", token);

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
        }

        // ✅ Check if SECRET_KEY is available
        if (!SECRET_KEY) {
            console.error("Missing SECRET_KEY in environment variables");
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        // ✅ Verify JWT token correctly
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            console.error("JWT Verification Failed:", err);
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        if (!decoded || !decoded.user || !decoded.user.email) {
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const userEmail = decoded.user.email;

        // ✅ Handle PDF file
        const pdf = formData.get("pdf");
        let pdfUrl = null;
        if (pdf) {
            const pdfByteData = await pdf.arrayBuffer();
            const pdfBuffer = Buffer.from(pdfByteData);
            const uploadDir = path.join(process.cwd(), "public", "uploads");
            const pdfPath = path.join(uploadDir, `${timestamp}_${pdf.name}`);
            await writeFile(pdfPath, pdfBuffer);
            pdfUrl = `/uploads/${timestamp}_${pdf.name}`;
        }

        // ✅ Handle Image file
        const image = formData.get("image");
        let imgUrl = null;
        if (image) {
            const imageByteData = await image.arrayBuffer();
            const imageBuffer = Buffer.from(imageByteData);
            const imagePath = path.join(process.cwd(), "public", "uploads", `${timestamp}_${image.name}`);
            await writeFile(imagePath, imageBuffer);
            imgUrl = `/uploads/${timestamp}_${image.name}`;
        }

        // ✅ Construct Resource Data
        const resourcesData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            author: formData.get("author"),
            image: imgUrl,
            pdf: pdfUrl,
            department: formData.get("department"),
            semester: formData.get("semester"),
            year: formData.get("year"),
            email: userEmail,
            createdAt: new Date(),
        };

        // ✅ Save to database
        await ResourcesModel.create(resourcesData);
        return NextResponse.json({ success: true, msg: "Resource Added" });

    } catch (error) {
        console.error("Error in POST API:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}




