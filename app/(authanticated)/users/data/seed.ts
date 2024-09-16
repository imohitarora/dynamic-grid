import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

export function generateUsers(count: number) {
    return Array.from({ length: count }, () => ({
        id: `USER-${faker.number.int({ min: 1000, max: 9999 })}`,
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

export function writeUsersToFile() {
    const users = generateUsers(150)

    fs.writeFileSync(
        path.join(process.cwd(), "users.json"),
        JSON.stringify(users, null, 2)
    )
    console.log("✅ Users data generated.")
}
