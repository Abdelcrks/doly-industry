import { NextResponse } from "next/server";
import { db } from "@/src/db";
import {
  products,
  brands,
  categories,
  productImages,
} from "@/src/db/schema";
import { and, eq } from "drizzle-orm";

export async function GET() {
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      genderFit: products.genderFit,
      brand: brands.name,
      category: categories.name,
      mainImage: productImages.imageUrl,
    })
    .from(products)
    .innerJoin(brands, eq(products.brandId, brands.id))
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(
      productImages,
      and(
        eq(productImages.productId, products.id),
        eq(productImages.isMain, true)
      )
    );

  return NextResponse.json(result);
}
