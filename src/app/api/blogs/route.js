export const dynamic = "force-dynamic";
import { ConnectDB } from "../../../lib/config/db";
import BlogsModel from "../../../lib/models/Blogs";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// ✅ Cloudinary Config (no need for external file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ GET API: Fetch User-Specific Blogs
export async function GET() {
  try {
    await ConnectDB();
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.user?.email;
    if (!userEmail) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const blogs = await BlogsModel.find({ email: userEmail });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await ConnectDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.user.email;

    const formData = await request.formData();
    const imageFile = formData.get("file"); // 👈 important fix

    let imageUrl = "";

    if (imageFile && imageFile.name) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      author: formData.get("author"),
      category: formData.get("category"),
      email: userEmail,
      image: imageUrl,
      createdAt: new Date(),
    };

    await BlogsModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// ✅ PUT API: Add Topic (with optional Cloudinary image)
export async function PUT(request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Blog ID required" }, { status: 400 });

    const isMultipart = request.headers.get("content-type")?.includes("multipart/form-data");
    let newTopic = {};

    if (isMultipart) {
      const formData = await request.formData();
      newTopic.heading = formData.get("heading");
      newTopic.description = formData.get("description");

      const imageFile = formData.get("image");
      if (imageFile && imageFile.name) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "blog-topics" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(buffer);
        });

        newTopic.image = uploadResult.secure_url;
      }
    } else {
      const body = await request.json();
      newTopic.heading = body.heading;
      newTopic.description = body.description;
      if (body.image) newTopic.image = body.image;
    }

    Object.keys(newTopic).forEach(key => !newTopic[key] && delete newTopic[key]);

    const updatedBlog = await BlogsModel.findByIdAndUpdate(
      id,
      { $push: { topics: newTopic }, $set: { updatedDate: new Date() } },
      { new: true }
    );

    if (!updatedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json({ success: true, msg: "Topic added", blog: updatedBlog });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ DELETE API: Delete Topic or Blog
export async function DELETE(request) {
  try {
    await ConnectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");
    const topicId = searchParams.get("topicId");

    if (!blogId) return NextResponse.json({ error: "Blog ID required" }, { status: 400 });

    if (topicId) {
      const blog = await BlogsModel.findById(blogId);
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

      blog.topics = blog.topics.filter(topic => topic._id.toString() !== topicId);
      await blog.save();

      return NextResponse.json({ success: true, msg: "Topic deleted" });
    }

    const deletedBlog = await BlogsModel.findByIdAndDelete(blogId);
    if (!deletedBlog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    return NextResponse.json({ success: true, msg: "Blog deleted" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
