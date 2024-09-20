import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
});

export const address = pgTable("address", {
    id: serial("id").primaryKey(),
    street: text("street"),
    city: text("city"),
    zipCode: text("zip"),
    userId: integer("user_id").references(() => user.id),
});

export type InsertUser = typeof user.$inferInsert;
export type InsertAddress = typeof address.$inferInsert;

export type SelectUser = typeof user.$inferSelect;
export type SelectAddress = typeof address.$inferSelect;