import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from 'pg'; // This imports node-postgres Pool for connection pooling

// Use Pool for connection pooling (best practice for server-side apps)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle with node-postgres client
const db = drizzle(pool, { logger: true });

export default db;
