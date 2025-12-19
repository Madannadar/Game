import { pool } from "../db/db";

export async function syncUser(
  clerkUserId: string,
  email?: string
) {
  const result = await pool.query(
    `SELECT * FROM users WHERE clerk_user_id = $1`,
    [clerkUserId]
  );

  if (result.rows.length > 0) {
    console.log("User already exists");
    return result.rows[0];
  }

  const insert = await pool.query(
    `INSERT INTO users (clerk_user_id, email)
     VALUES ($1, $2)
     RETURNING *`,
    [clerkUserId, email]
  );
  console.log("User created in DB");
  return insert.rows[0];
}
