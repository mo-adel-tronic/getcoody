import { addLesson } from "@/api/lessons";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  let { title, lesson_order, subject_id } = req;
  if (!title || !lesson_order || !subject_id) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        data: null,
        error: true,
      },
      { status: 400 }
    );
  }
  const res = await addLesson({
    title,
    lesson_order,
    subject_id,
  });
  if (res.error) {
    return NextResponse.json(res, { status: 500 });
  }
  return NextResponse.json(res);
}