import { createPool, Pool } from 'mysql2/promise';

// Create a MySQL connection pool
const pool: Pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows as T
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
export async function queryWithCache<T>(sql: string, params: any[] = []): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params)
    return rows as T
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}