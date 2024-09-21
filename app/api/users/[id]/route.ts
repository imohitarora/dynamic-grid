import { NextRequest } from "next/server";
import { getUserById } from "@/action/query";

type Params = {
    id: number;
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const { id } = context.params;
    const user = await getUserById(id);
    return new Response(JSON.stringify({ user }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
}