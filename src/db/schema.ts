import {
    pgTable,
    serial,
    text,
    integer,
    boolean,
    timestamp,
  } from "drizzle-orm/pg-core";
  import { pgEnum } from "drizzle-orm/pg-core";
  
  /* -------- Enums -------- */
  
  export const genderFitEnum = pgEnum("gender_fit_enum", [
    "men",
    "women",
    "unisex",
  ]);
  
  export const categoryKindEnum = pgEnum("category_kind_enum", [
    "shoes",
    "clothing",
    "accessory",
  ]);



  /* -------- Groupes de tailles -------- */

export const sizeGroups = pgTable("size_groups", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),           // ex: "Chaussures Homme 40–45"
    code: text("code").notNull().unique(),  // ex: "MEN_SHOES_40_45"
    description: text("description"),
  });
  
  /* -------- Tailles -------- */
  
  export const sizes = pgTable("sizes", {
    id: serial("id").primaryKey(),
    sizeGroupId: integer("size_group_id")
      .notNull()
      .references(() => sizeGroups.id, { onDelete: "cascade" }),
    label: text("label").notNull(),      // "40", "41", "XS", "M", "TU", etc.
    sortOrder: integer("sort_order").notNull(), // pour trier les tailles
    // Si tu veux être hardcore plus tard : UNIQUE(size_group_id, label) en migration SQL
  });
  
  
  /* -------- Marques -------- */
  
  export const brands = pgTable("brands", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    websiteUrl: text("website_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  });
  
  /* -------- Catégories -------- */
  
  export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    kind: categoryKindEnum("kind").notNull(), // 'shoes' | 'clothing' | 'accessory'
  });
  
  /* -------- Produits (simplifié pour commencer) -------- */
  
  export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    brandId: integer("brand_id")
      .notNull()
      .references(() => brands.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    genderFit: genderFitEnum("gender_fit").notNull(), // 'men' | 'women' | 'unisex'
    description: text("description"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  });
  