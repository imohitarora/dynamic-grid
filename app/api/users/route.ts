import { getUsers } from "@/action/query";
import { NextResponse } from "next/server";

export async function GET() {
    const users = await getUsers();
    return NextResponse.json({ status: "success", users });
}