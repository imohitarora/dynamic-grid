import { getUsers, filterUser } from "@/action/query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const searchString = searchParams.get("search");

    if (searchString) {
        const users = await filterUser(searchString);
        return NextResponse.json({ status: "success", users });
    }

    const users = await getUsers();
    return NextResponse.json({ status: "success", users });
}
