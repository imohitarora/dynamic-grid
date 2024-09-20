import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { userSchema } from "../../(authanticated)/dashboard/data/schema";
import { NextResponse } from "next/server";
import { select } from '@/action/query'


export async function getUsers() {
    const usersDB = await select();
    console.log(usersDB)

    const data = await fs.readFile(path.join(process.cwd(), "app/(authanticated)/dashboard/data/users.json"));

    const users = JSON.parse(data.toString());

    return z.array(userSchema).parse(users);
}



export async function GET() {
    const users = await getUsers();
    return NextResponse.json({ status: "success", users });
}