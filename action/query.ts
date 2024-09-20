import db from "@/drizzle/db";
import { user, InsertUser, address } from "@/drizzle/schema";
import { eq, ilike, or, and, sql } from "drizzle-orm";

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
    return filteredUsers;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getUsersWithPaginationAndFilter(page: number, pageSize: number, filters: any[]) {
    const offset = page * pageSize;

    let whereClause = undefined;
    if (filters.length > 0) {
        whereClause = and(...filters.map(filter => {
            const column = filter.id === 'city' ? address[filter.id] : user[filter.id];
            if (filter.id === 'id') {
                return eq(column, parseInt(filter.value, 10));
            }
            return ilike(column, `%${filter.value}%`);
        }));
    }

    const usersQuery = db.select({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: address,
    })
        .from(user)
        .innerJoin(address, eq(user.id, address.userId))
        .where(whereClause)
        .limit(pageSize)
        .offset(offset)
        .orderBy(user.id);

    const totalCountQuery = db.select({ count: sql<number>`cast(count(*) as int)` })
        .from(user)
        .innerJoin(address, eq(user.id, address.userId))
        .where(whereClause);

    const [users, [{ count }]] = await Promise.all([usersQuery, totalCountQuery]);

    return { users, totalCount: count };
}