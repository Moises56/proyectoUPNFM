import { config } from "dotenv";
config();

export const database = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "stacy1227",
  database: process.env.DATABASE_NAME || "proyectocarrera",
  port: process.env.DATABASE_PORT || 3306,
};

export const port = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || 'some secret key';