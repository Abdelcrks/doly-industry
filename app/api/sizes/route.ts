import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { sizes } from "@/src/db/schema";

export async function GET() {
  const result = await db.select().from(sizes);
  return NextResponse.json(result);
}
