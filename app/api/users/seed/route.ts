import { NextResponse } from "next/server";
import seedUsers from '@/drizzle/seed'
import db from '@/drizzle/db'

export async function GET() {
    const users = await seedUsers(db);;
    return NextResponse.json({ status: "success", users });
}