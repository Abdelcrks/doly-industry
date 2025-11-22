import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { categories } from "@/src/db/schema";

export async function GET() {
  const result = await db.select().from(categories);
  return NextResponse.json(result);
}
