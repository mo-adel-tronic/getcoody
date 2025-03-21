import { getUser } from "@/api/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, { params }: { params: { email: string } }) {
    const user = await getUser(params.email)
    if(user.error) {
        return NextResponse.json(user, { status: 500 })
    }
    return NextResponse.json(user)
}