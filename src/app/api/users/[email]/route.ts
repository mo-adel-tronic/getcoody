import { getUser } from "@/api/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, { params }: { params: Promise<{ email: string }> }) {
    const {email} = await params
    const user = await getUser(email)
    if(user.error) {
        return NextResponse.json(user, { status: 500 })
    }
    return NextResponse.json(user)
}