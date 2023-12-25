'use server';
import { sql } from '@vercel/postgres';

export async function getNews(page = 1, limit = 100) {
  // const { rows } = await sql`SELECT * from news ORDER BY date DESC`;
  // return rows;
  const { rows } =
    await sql`SELECT * from news ORDER BY date DESC OFFSET ${page} LIMIT ${limit}`;
  return rows;
}
