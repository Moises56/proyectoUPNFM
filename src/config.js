import { config } from "dotenv";
config();

export const database = {
  connectionLimit: 10,
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "asd456",
  database: process.env.DATABASE_NAME || "proyectocarrera",
  port: process.env.DATABASE_PORT || 3307,
};

// export const database = {
//   connectionLimit: 10,
//   host: process.env.DATABASE_HOST || "containers-us-west-196.railway.app",
//   user: process.env.DATABASE_USER || "root",
//   password: process.env.DATABASE_PASSWORD || "tBKBHqo4020Yy0gqQDZT",
//   database: process.env.DATABASE_NAME || "railway",
//   port: process.env.DATABASE_PORT || 5433,
// };

export const port = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || 'some secret key';