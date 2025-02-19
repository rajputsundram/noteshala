export const dynamic = "force-dynamic";
import { ConnectDB } from "../../../lib/config/db";
import TutorialsModel from "../../../lib/models/TutorialsModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

// ✅ GET API: Fetch User-Specific Tutorials
export async function GET() {
    try {
        await ConnectDB();
        const cookieStore = cookies();
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

        const resources = await TutorialsModel.find({ email: userEmail });
        return NextResponse.json({ success: true, resources });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ POST API: Add a New Tutorial
export async function POST(request) {
    try {
        await ConnectDB();
        const formData = await request.formData();
        const cookieStore = cookies();
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
        return NextResponse.json({ success: true, msg: "Resource Added" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

// ✅ PUT API: Update Tutorial by Adding a Topic
export async function PUT(request) {
  try {
      await ConnectDB();
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");

      if (!id) {
          return NextResponse.json({ error: "Tutorial ID is required" }, { status: 400 });
      }

      let newTopic = {};

      // ✅ Check if request is `multipart/form-data`
      if (request.headers.get("content-type")?.includes("multipart/form-data")) {
          const formData = await request.formData();
          newTopic.heading = formData.get("heading");
          newTopic.description = formData.get("description");
          const imageFile = formData.get("image");

          if (imageFile && imageFile.name) {
              newTopic.image = imageFile.name;
          }
      } else {
          // ✅ Handle JSON data
          const body = await request.json();
          newTopic.heading = body.heading;
          newTopic.description = body.description;

          if (body.image) {
              newTopic.image = body.image;
          }
      }

      // ✅ Log received data for debugging
      console.log("Extracted New Topic:", newTopic);

      if (!newTopic.heading || !newTopic.description) {
          return NextResponse.json({ error: "Heading and Description are required for topics" }, { status: 400 });
      }

      // ✅ Prevent storing empty image values
      Object.keys(newTopic).forEach(key => {
          if (!newTopic[key]) delete newTopic[key];
      });

      const updatedTutorial = await TutorialsModel.findByIdAndUpdate(
          id,
          { $push: { topics: newTopic }, $set: { updatedDate: new Date() } },
          { new: true }
      );

      if (!updatedTutorial) {
          return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, msg: "Topic added successfully!", tutorial: updatedTutorial });
  } catch (error) {
      console.error("Error in PUT API:", error);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}



// ✅ DELETE API: Remove a Tutorial or a Specific Topic
export async function DELETE(request) {
    try {
        await ConnectDB();
        const { searchParams } = new URL(request.url);
        const tutorialId = searchParams.get("tutorialId");
        const topicId = searchParams.get("topicId");

        if (!tutorialId) {
            return NextResponse.json({ error: "Tutorial ID is required" }, { status: 400 });
        }

        // If a topicId is provided, delete only the topic
        if (topicId) {
            const tutorial = await TutorialsModel.findById(tutorialId);
            if (!tutorial) {
                return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
            }

            // Remove the topic from the array
            tutorial.topics = tutorial.topics.filter((topic) => topic._id.toString() !== topicId);
            await tutorial.save();

            return NextResponse.json({ success: true, msg: "Topic deleted successfully" });
        }

        // If no topicId is provided, delete the entire tutorial
        const deletedTutorial = await TutorialsModel.findByIdAndDelete(tutorialId);
        if (!deletedTutorial) {
            return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, msg: "Tutorial deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

