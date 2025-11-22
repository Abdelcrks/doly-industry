import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { sizeGroups, sizes } from "@/src/db/schema";

export async function POST() {
  // 1. Groupes de tailles
  const groupsData = [
    {
      name: "Chaussures Homme 40–45",
      code: "MEN_SHOES_40_45",
      description: "Chaussures homme du 40 au 45",
    },
    {
      name: "Chaussures Femme 36–42",
      code: "WOMEN_SHOES_36_42",
      description: "Chaussures femme du 36 au 42",
    },
    {
      name: "Chaussures Mixte 36–45",
      code: "UNISEX_SHOES_36_45",
      description: "Chaussures mixtes du 36 au 45",
    },
    {
      name: "Vêtements XXS–XXL",
      code: "CLOTHES_XXS_XXL",
      description: "Vêtements du XXS au XXL",
    },
    {
      name: "Taille unique",
      code: "ONE_SIZE",
      description: "Accessoires taille unique (bonnet, casquette...)",
    },
  ];

  await db.insert(sizeGroups).values(groupsData);

  // 2. Récupérer les groupes avec leurs id
  const groups = await db.select().from(sizeGroups);

  const menShoes = groups.find((g) => g.code === "MEN_SHOES_40_45")!;
  const womenShoes = groups.find((g) => g.code === "WOMEN_SHOES_36_42")!;
  const unisexShoes = groups.find((g) => g.code === "UNISEX_SHOES_36_45")!;
  const clothes = groups.find((g) => g.code === "CLOTHES_XXS_XXL")!;
  const oneSize = groups.find((g) => g.code === "ONE_SIZE")!;

  // 3. Tailles chaussures homme 40–45
  const menShoesSizes = [40, 41, 42, 43, 44, 45].map((num, index) => ({
    sizeGroupId: menShoes.id,
    label: String(num),
    sortOrder: index + 1,
  }));

  // 4. Tailles chaussures femme 36–42
  const womenShoesSizes = [36, 37, 38, 39, 40, 41, 42].map((num, index) => ({
    sizeGroupId: womenShoes.id,
    label: String(num),
    sortOrder: index + 1,
  }));

  // 5. Tailles chaussures unisexes 36–45
  const unisexShoesSizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map(
    (num, index) => ({
      sizeGroupId: unisexShoes.id,
      label: String(num),
      sortOrder: index + 1,
    })
  );

  // 6. Tailles vêtements XXS–XXL
  const clothesSizesData = [
    "XXS",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
  ].map((label, index) => ({
    sizeGroupId: clothes.id,
    label,
    sortOrder: index + 1,
  }));

  // 7. Taille unique
  const oneSizeData = [
    {
      sizeGroupId: oneSize.id,
      label: "TU", // Taille Unique
      sortOrder: 1,
    },
  ];

  await db.insert(sizes).values([
    ...menShoesSizes,
    ...womenShoesSizes,
    ...unisexShoesSizes,
    ...clothesSizesData,
    ...oneSizeData,
  ]);

  return NextResponse.json({ message: "Size groups & sizes inserted!" });
}
