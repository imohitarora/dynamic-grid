import { getUsersWithPaginationAndFilter } from "@/action/query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");

    const { users, totalCount } = await getUsersWithPaginationAndFilter(page, pageSize, filters);
    const pageCount = Math.ceil(totalCount / pageSize);

    return NextResponse.json({ status: "success", users, pageCount, totalCount });
}


