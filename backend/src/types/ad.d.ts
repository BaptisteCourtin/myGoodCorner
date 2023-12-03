import type AdEntity from "../entities/Ad.entity"; //on peut importer uniquement le type à partir d'une classe et non le type ET les valeurs

export interface AdCreateInput extends Omit<Ad, "id" | "createdAt" | "slug"> {
  tags: string[];
} // Construct a type with the properties of T except for those in type K
