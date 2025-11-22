import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { brands } from "@/src/db/schema";

export async function POST() {
  const data = [
    { name: "Lululemon", slug: "lululemon" },
    { name: "On", slug: "on" },
    { name: "Alo Yoga", slug: "alo-yoga" },
    { name: "Asics", slug: "asics" },
    { name: "Nike", slug: "nike" },
    { name: "Saucony", slug: "saucony" },
  ];

  await db.insert(brands).values(data);

  return NextResponse.json({ message: "Marque insérer!" });
}