import dotenv from 'dotenv';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const config = {
  development: {
    username: DB_USER || "postgres",
    password: DB_PASSWORD || "postgres",
    database: DB_NAME || "ecommerce",
    host: DB_HOST,
    dialect: "postgres"
  },
  test: {
    username: DB_USER || "postgres",
    password: DB_PASSWORD || "postgres",
    database: DB_NAME || "ecommerce_test",
    host: DB_HOST,
    dialect: "postgres",
    logging: false
  },
  production: {
    databaseUrl: process.env.DATABASE_URL,
    // username: DB_USER || "root",
    // password: DB_PASSWORD || null,
    // database: DB_NAME || "database_production",
    // host: DB_HOST,
    // dialect: "postgres"
  }
}

export default config;