import type TagEntity from "../entities/Tag.entity";

export type TagCreateInput = Omit<Category, "id">;
