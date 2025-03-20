import { getAllUsers } from "@/api/users";
import { NextResponse } from "next/server";

export async function GET () {
    const items = await getAllUsers()
    if(items.error) {
        return NextResponse.json(items, { status: 500 })
    }
    return NextResponse.json(items)
}