export const dynamic = "force-dynamic";
import { ConnectDB } from "../../../lib/config/db";
import TutorialsModel from "../../../lib/models/TutorialsModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

// GET API: Fetch User-Specific Tutorials
export async function GET() {
  try {
    await ConnectDB();
    const token = cookies().get("token")?.value;
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

    const resources = await TutorialsModel.find({ email: userEmail });
    return NextResponse.json({ success: true, resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST API: Add a New Tutorial
export async function POST(request) {
  try {
    await ConnectDB();
    const formData = await request.formData();
    const token = cookies().get("token")?.value;

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

    const userEmail = decoded.user.email;
    const resourcesData = {
      title: formData.get("title"),
      description: formData.get("description"),
      author: formData.get("author"),
      department: formData.get("department"),
      semester: formData.get("semester"),
      year: formData.get("year"),
      email: userEmail,
      createdAt: new Date(),
    };

    await TutorialsModel.create(resourcesData);
    return NextResponse.json({ success: true, msg: "Tutorial Added" });
  } catch (error) {
    console.error("Error adding resource:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT API: Update Tutorial by Adding a Topic with Cloudinary Image Upload
export async function PUT(request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Tutorial ID is required" }, { status: 400 });
    }

    const newTopic = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      newTopic.heading = formData.get("heading");
      newTopic.description = formData.get("description");
      const imageFile = formData.get("image");

      if (imageFile && imageFile.size) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const dataUri = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
        const uploadResult = await cloudinary.uploader.upload(dataUri, { folder: "tutorial_topics" });
        newTopic.image = uploadResult.secure_url;
      }
    } else {
      const body = await request.json();
      newTopic.heading = body.heading;
      newTopic.description = body.description;
      if (body.image) newTopic.image = body.image;
    }

    if (!newTopic.heading || !newTopic.description) {
      return NextResponse.json({ error: "Heading and Description are required" }, { status: 400 });
    }

    const updated = await TutorialsModel.findByIdAndUpdate(
      id,
      { $push: { topics: newTopic }, $set: { updatedDate: new Date() } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Topic added successfully", tutorial: updated });
  } catch (error) {
    console.error("Error in PUT API:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE API: Remove a Tutorial or a Specific Topic
export async function DELETE(request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(request.url);
    const tutorialId = searchParams.get("tutorialId");
    const topicId = searchParams.get("topicId");

    if (!tutorialId) {
      return NextResponse.json({ error: "Tutorial ID is required" }, { status: 400 });
    }

    if (topicId) {
      const tutorial = await TutorialsModel.findById(tutorialId);
      if (!tutorial) {
        return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
      }
      tutorial.topics = tutorial.topics.filter(t => t._id.toString() !== topicId);
      await tutorial.save();
      return NextResponse.json({ success: true, msg: "Topic deleted successfully" });
    }

    const deleted = await TutorialsModel.findByIdAndDelete(tutorialId);
    if (!deleted) {
      return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, msg: "Tutorial deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
