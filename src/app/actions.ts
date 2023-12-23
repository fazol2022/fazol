'use server';
import { sql } from '@vercel/postgres';

export async function getNews() {
  const { rows } = await sql`SELECT * from news ORDER BY date DESC`;
  return rows;
}
