import { getUsersWithPaginationAndFilter } from "@/action/query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "0", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const searchString = searchParams.get("search") || "";

    try {
        const { users, totalCount } = await getUsersWithPaginationAndFilter(page, pageSize, searchString);
        const pageCount = Math.ceil(totalCount / pageSize);

        return NextResponse.json({
            status: "success",
            users,
            pageCount,
            totalCount
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({
            status: "error",
            message: "An error occurred while fetching users"
        }, { status: 500 });
    }
}

