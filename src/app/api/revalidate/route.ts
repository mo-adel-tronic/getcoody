import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const { email } = req;
  if (!email) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        data: null,
        error: true,
      },
      { status: 400 }
    );
  }
  try {
    revalidatePath('/', 'layout')
    return NextResponse.json({
        message: "Cache revalidated",
        data: null,
        error: false
    });
  } catch (error) {
    return NextResponse.json({
      message: "revalidated error: " + (error instanceof Error ? error.message : "Unknown error"),
      data: null,
      error: true
    }, {status: 500})
  }
}