import { addSubject, getAllSubjects } from "@/api/subjects";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await getAllSubjects();
  if (items.error) {
    return NextResponse.json(items, { status: 500 });
  }
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const req = await request.json();
  const { id, title, title_prefix, targets } = req;
  if (!title || !targets || !id || !title_prefix) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        data: null,
        error: true,
      },
      { status: 400 }
    );
  }
  const res = await addSubject({
    id,
    title,
    title_prefix,
    targets,
  });
  if (res.error) {
    return NextResponse.json(res, { status: 500 });
  }
  return NextResponse.json(res);
}
