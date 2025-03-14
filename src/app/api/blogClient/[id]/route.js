import { NextResponse } from "next/server";
import Blog from "../../../../lib/models/Blogs";
import { ConnectDB } from "../../../../lib/config/db";

export async function GET(request, { params }) {
  try {
    await ConnectDB();

    const { id } = params; // Retrieve the dynamic route parameter

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
