export const dynamic = "force-dynamic";
import { ConnectDB } from "../../../lib/config/db";
import BlogsModel from "../../../lib/models/Blogs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// ✅ GET API: Fetch User-Specific Blogs
export async function GET() {
    try {
        await ConnectDB();
        const cookieStore = await cookies();  // ⬅️ Await cookies()
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
        }

        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) {
            console.error("Missing SECRET_KEY in environment variables");
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            console.error("JWT Verification Failed:", err);
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const userEmail = decoded.user?.email;
        if (!userEmail) {
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const blogs = await BlogsModel.find({ email: userEmail });
        return NextResponse.json({ success: true, blogs });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ POST API: Add a New Blog
export async function POST(request) {
    try {
        await ConnectDB();
        const formData = await request.formData();
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized: No token" }, { status: 401 });
        }

        const SECRET_KEY = process.env.JWT_SECRET;
        if (!SECRET_KEY) {
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, SECRET_KEY);
        } catch (err) {
            return NextResponse.json({ error: "Unauthorized: Invalid token" }, { status: 401 });
        }

        const userEmail = decoded.user.email;
        const imageFile = formData.get("image");
        let imagePath = "";

        if (imageFile && imageFile.name) {
            const uploadDir = path.join(process.cwd(), "public/uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            
            imagePath = `${Date.now()}-${imageFile.name}`; // ✅ Corrected path
            const filePath = path.join(uploadDir, imagePath); // ✅ Corrected path
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            fs.writeFileSync(filePath, buffer);
        }

        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            author: formData.get("author"),
            category: formData.get("category"),
            email: userEmail,
            image: `/uploads/${imagePath}`, // ✅ Correct path for frontend
            createdAt: new Date(),
        };

        await BlogsModel.create(blogData);
        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Error in POST API:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ PUT API: Update Blog by Adding a Topic

export async function PUT(request) {
    try {
        await ConnectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        let newTopic = {};

        // Check if request is multipart/form-data
        if (request.headers.get("content-type")?.includes("multipart/form-data")) {
            const formData = await request.formData();
            newTopic.heading = formData.get("heading");
            newTopic.description = formData.get("description");

            const imageFile = formData.get("image");
            if (imageFile && imageFile.name) {
                // Create uploads folder if it doesn't exist
                const uploadDir = path.join(process.cwd(), "public/uploads");
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                // Create a unique filename and store file
                const imagePath = `${Date.now()}-${imageFile.name}`;
                const filePath = path.join(uploadDir, imagePath);
                const buffer = Buffer.from(await imageFile.arrayBuffer());
                fs.writeFileSync(filePath, buffer);
                // Save correct URL for frontend
                newTopic.image = `/uploads/${imagePath}`;
            }
        } else {
            // Handle JSON data
            const rawBody = await request.text();

            if (!rawBody) {
                return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
            }

            let body;
            try {
                body = JSON.parse(rawBody);
            } catch (error) {
                console.error("Invalid JSON format:", rawBody);
                return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
            }

            newTopic.heading = body.heading;
            newTopic.description = body.description;
            if (body.image) {
                newTopic.image = body.image;
            }
        }

        // Log received data for debugging
        console.log("Extracted New Topic:", newTopic);

        if (!newTopic.heading || !newTopic.description) {
            return NextResponse.json({ error: "Heading and Description are required" }, { status: 400 });
        }

        // Remove keys with empty values (e.g., image if not provided)
        Object.keys(newTopic).forEach(key => {
            if (!newTopic[key]) delete newTopic[key];
        });

        // Update Blog Document: Push new topic and update the updatedDate field
        const updatedBlog = await BlogsModel.findByIdAndUpdate(
            id,
            { $push: { topics: newTopic }, $set: { updatedDate: new Date() } },
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Topic added successfully!", blog: updatedBlog });
    } catch (error) {
        console.error("Error in PUT API:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}



export async function DELETE(request) {
    try {
        await ConnectDB();
        const { searchParams } = new URL(request.url);
        const blogId = searchParams.get("blogId");  // Use 'blogId' as query param
        const topicId = searchParams.get("topicId");  // Use 'topicId' if deleting a specific topic

        if (!blogId) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        // If a topicId is provided, delete only the topic
        if (topicId) {
            const blog = await BlogsModel.findById(blogId);
            if (!blog) {
                return NextResponse.json({ error: "Blog not found" }, { status: 404 });
            }

            // Log before filtering
            console.log("Before deleting topic:", blog.topics);

            // Ensure proper ObjectId conversion for the topicId comparison
            const ObjectId = require('mongodb').ObjectId;
            blog.topics = blog.topics.filter((topic) => topic._id.toString() !== new ObjectId(topicId).toString());

            // Log after filtering
            console.log("After deleting topic:", blog.topics);

            await blog.save();

            return NextResponse.json({ success: true, msg: "Topic deleted successfully" });
        }

        // If no topicId is provided, delete the entire blog
        const deletedBlog = await BlogsModel.findByIdAndDelete(blogId);

        // Check if the blog was found and deleted
        if (!deletedBlog) {
            return NextResponse.json({ error: "Blog not found or already deleted" }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
