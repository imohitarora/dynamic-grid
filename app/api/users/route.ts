import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { userSchema } from "../../(authanticated)/dashboard/data/schema";
import { NextResponse } from "next/server";


export async function getUsers() {
    const data = await fs.readFile(path.join(process.cwd(), "app/(authanticated)/dashboard/data/users.json"));

    const users = JSON.parse(data.toString());

    return z.array(userSchema).parse(users);
}

export async function GET() {
    const users = await getUsers();
    return NextResponse.json({ status: "success", users });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsedBody = userSchema.parse(body);

        const dataPath = path.join(process.cwd(), "app/(authanticated)/dashboard/data/users.json");
        const data = await fs.readFile(dataPath);
        const users = JSON.parse(data.toString());

        users.push(parsedBody);

        await fs.writeFile(dataPath, JSON.stringify(users, null, 2));

        return NextResponse.json({ status: "success", user: parsedBody }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 400 });
    }
}