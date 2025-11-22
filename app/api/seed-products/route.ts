import { NextResponse } from "next/server";
import { db } from "@/src/db";
import {
  products,
  productVariants,
  productImages,
  brands,
  categories,
  sizeGroups,
  sizes,
} from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  // 1. Marque "On"
  const [brand] = await db
    .select()
    .from(brands)
    .where(eq(brands.slug, "on"));

  if (!brand) {
    return NextResponse.json(
      { error: 'Brand "on" not found. Seed brands first.' },
      { status: 400 }
    );
  }

  // 2. Catégorie "sneakers"
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.slug, "sneakers"));

  if (!category) {
    return NextResponse.json(
      { error: 'Category "sneakers" not found. Seed categories first.' },
      { status: 400 }
    );
  }

  // 3. Groupe de tailles "MEN_SHOES_40_45"
  const [menShoesGroup] = await db
    .select()
    .from(sizeGroups)
    .where(eq(sizeGroups.code, "MEN_SHOES_40_45"));

  if (!menShoesGroup) {
    return NextResponse.json(
      {
        error:
          'Size group "MEN_SHOES_40_45" not found. Seed sizes first.',
      },
      { status: 400 }
    );
  }

  // 4. Tailles pour ce groupe
  const menShoesSizes = await db
    .select()
    .from(sizes)
    .where(eq(sizes.sizeGroupId, menShoesGroup.id));

  // 5. Créer le produit On Cloudtilt (blanche)
  const [product] = await db
    .insert(products)
    .values({
      brandId: brand.id,
      categoryId: category.id,
      name: "On Cloudtilt Homme",
      slug: "on-cloudtilt-homme",
      genderFit: "men",
      description:
        "Sneaker blanche On Cloudtilt pour homme, pensées pour le confort urbain et la performance au quotidien.",
      isActive: true,
    })
    .returning();

  // 6. Variantes (une par taille, couleur blanche)
  const variantsData = menShoesSizes.map((s) => ({
    productId: product.id,
    sizeId: s.id,
    color: "white",      // ✅ couleur cohérente avec la chaussure
    priceCents: 10000,
    isAvailable: true,
  }));

  await db.insert(productVariants).values(variantsData);

  // 7. Images locales (dans public/products/on/sneakers/...)
  const imagePaths = [
    "/products/on/sneakers/on-cloudtilt-1.webp",
    "/products/on/sneakers/on-cloudtilt-2.webp",
    "/products/on/sneakers/on-cloudtilt-3.webp",
    "/products/on/sneakers/on-cloudtilt-4.webp",
    "/products/on/sneakers/on-cloudtilt-5.webp",
    "/products/on/sneakers/on-cloudtilt-6.webp",
    "/products/on/sneakers/on-cloudtilt-7.webp",
  ];

  const imagesData = imagePaths.map((path, index) => ({
    productId: product.id,
    imageUrl: path,
    altText: `On Cloudtilt Homme blanche - vue ${index + 1}`,
    position: index + 1,
    isMain: index === 0, // ✅ la 1ère comme image principale
  }));

  await db.insert(productImages).values(imagesData);

  return NextResponse.json({ message: "On cloudtilt ajouter!" });
}
