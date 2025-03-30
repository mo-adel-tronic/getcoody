import { getsubjectLessons } from "@/api/lessons";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ subjectId: string }> }) {
  const {subjectId} = await params
  const items = await getsubjectLessons(parseInt(subjectId));
  if (items.error) {
    return NextResponse.json(items, { status: 500 });
  }
  return NextResponse.json(items);
}