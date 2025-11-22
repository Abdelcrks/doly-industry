import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { brands } from "@/src/db/schema";

export async function GET() {
  const result = await db.select().from(brands);
  return NextResponse.json(result);
}
