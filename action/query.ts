import db from "@/drizzle/db";
import { user, InsertUser, address } from "@/drizzle/schema";
import { eq, ilike, or } from "drizzle-orm";

export async function getUsers() {
    const allUsers = await db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: address,
    }).from(user).innerJoin(address, eq(user.id, address.userId)).orderBy(user.id);
    return allUsers;
}

export async function createUser(data: InsertUser) {
    await db.insert(user).values(data);
}

export async function filterUser(searchString: string) {
    const filteredUsers = await db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: address,
    }).from(user).innerJoin(address, eq(user.id, address.userId))
        .where(or(
            ilike(user.name, `%${searchString}%`),
            ilike(user.email, `%${searchString}%`),
            ilike(user.phone, `%${searchString}%`),
            ilike(address.city, `%${searchString}%`),
        )).orderBy(user.id);
    console.log('filteredUsers:', filteredUsers);
    return filteredUsers;
}