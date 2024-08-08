import dotenv from "dotenv";
import pkg from "pg"
dotenv.config();

const { Pool } = pkg;
const { Client } = pkg;
const pool = new Pool({
    connectionString: `${process.env.DATABASE_URL}remote-work-collab`,
});

const createDatabase = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL, // Connect to the server, not the specific DB
        // password: "root",
    });

    try {
        await client.connect();
        const dbName = "remote-work-collab";
        await client.query(`CREATE DATABASE "${dbName}"`);
        // await client.query(`psql "${dbName}"`);
        console.log(`Database "${dbName}" created successfully`);
    } catch (err) {
        if (err.code === '42P04') {
            console.log('Database already exists.');
        } else {
            console.error('Error creating database:', err);
            process.exit(1); // Exit the process with a failure code
        }
    } finally {
        await client.end();
    }
};

export { createDatabase, pool };