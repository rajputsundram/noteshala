import { ConnectDB } from "../../../../lib/config/db";
import TutorialsModel from "../../../../lib/models/TutorialsModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await ConnectDB();

    const { id } = params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid tutorial ID format" }, { status: 400 });
    }

    // Fetch the tutorial by ID
    const tutorial = await TutorialsModel.findById(id);

    if (!tutorial) {
      return NextResponse.json({ error: "Tutorial not found" }, { status: 404 });
    }

    return NextResponse.json(tutorial, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching tutorial:", error);
    return NextResponse.json({ error: "Failed to fetch tutorial" }, { status: 500 });
  }
}
