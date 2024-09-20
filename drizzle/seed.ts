import { address, user } from '@/drizzle/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { faker } from "@faker-js/faker";

export function generateUsers(count: number) {
    return Array.from({ length: count }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            zipCode: faker.location.zipCode(),
        },
    }))
}


const seedUsers = async (db: NodePgDatabase<Record<string, never>>) => { // Make this function async
    const users = generateUsers(140); // Generate 10 users
    for (const u of users) { // Use a for...of loop for async/await
        const [{ insertedId }] = await db.insert(user).values({
            ...u, // Spread user properties
        }).returning({ insertedId: user.id }); // Retrieve the generated user ID

        // Insert address with user ID as foreign key
        await db.insert(address).values({
            ...u.address, // Insert address properties here
            userId: insertedId // Add userId foreign key
        });
    }
    return users; // Return the generated users
}

export default seedUsers