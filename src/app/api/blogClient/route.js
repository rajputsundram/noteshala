import { NextResponse } from "next/server";
import Blog from "../../../lib/models/Blogs";
import { ConnectDB } from "../../../lib/config/db";

export async function GET(request) {
  try {
    await ConnectDB();

    // Always fetch all blogs since no id is provided.
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
