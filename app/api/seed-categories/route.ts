import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { categories } from "@/src/db/schema";

export async function POST() {
  const data: { name: string; slug: string; kind: "shoes" | "clothing" | "accessory" }[] = [
    { name: "Sneakers", slug: "sneakers", kind: "shoes" },
    { name: "Veste", slug: "veste", kind: "clothing" },
    { name: "Pantalon", slug: "pantalon", kind: "clothing" },
    { name: "Doudoune", slug: "doudoune", kind: "clothing" },
    { name: "T-shirt", slug: "t-shirt", kind: "clothing" },
    { name: "Pull", slug: "pull", kind: "clothing" },
    { name: "Parka", slug: "parka", kind: "clothing" },
    { name: "Chaussettes", slug: "chaussettes", kind: "accessory" },
    { name: "Casquette", slug: "casquette", kind: "accessory" },
    { name: "Bonnet", slug: "bonnet", kind: "accessory" },
  ];

  await db.insert(categories).values(data);

  return NextResponse.json({ message: "Categories inserted!" });
}
