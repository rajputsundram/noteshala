import { ConnectDB } from "../../../lib/config/db";
import TutorialsModel from "../../../lib/models/TutorialsModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await ConnectDB();
    const url = new URL(request.url);
    const year = url.searchParams.get("year");
    const department = url.searchParams.get("department");

    let query = {};
    if (year) query.year = year;
    if (department) query.department = department;

    const resources = await TutorialsModel.find(query);

    if (resources.length === 0) {
      return NextResponse.json({ message: "No resources found for the given parameters" }, { status: 404 });
    }

    return NextResponse.json({ resources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}
