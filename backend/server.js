import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user_routes.js';
import { createUsersTable } from './models/user_model.js';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use user routes
app.use('/api/users', userRoutes);

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}remote-work-collab`,
  ssl: false
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Error connecting to PostgreSQL:', err));
createUsersTable().
then(() => console.log("Table created")).
catch(() => console.log("Error creating table"));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
