import { addUser, getAllUsers, updateProfile } from "@/api/users";
import { NextResponse } from "next/server";

export async function GET () {
    const items = await getAllUsers()
    if(items.error) {
        return NextResponse.json(items, { status: 500 })
    }
    return NextResponse.json(items)
}


export async function POST(request: Request) {
  const req = await request.json();
  let { fullname, email, display_name, phone } = req;
  if (!fullname || !email || !display_name || !phone) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        data: null,
        error: true,
      },
      { status: 400 }
    );
  }
  const res = await addUser({
    fullname,
    email,
    display_name,
    phone,
  });
  if (res.error) {
    return NextResponse.json(res, { status: 500 });
  }
  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const req = await request.json();
  let { fullname, email, display_name, phone, id } = req;
  if (!fullname || !email || !display_name || !phone || !id) {
    return NextResponse.json(
      {
        message: "Missing required fields",
        data: null,
        error: true,
      },
      { status: 400 }
    );
  }
  const res = await updateProfile({
    fullname,
    email,
    display_name,
    phone,
    id
  });
  if (res.error) {
    return NextResponse.json(res, { status: 500 });
  }
  return NextResponse.json(res);
}