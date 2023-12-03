import { DataSource } from "typeorm";
import Ad from "../entities/Ad.entity";
import Category from "../entities/Category.entity";
import Tag from "../entities/Tag.entity";

export default new DataSource({
  type: "sqlite",
  database: "theGoodCornerORM.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
  logging: ["error", "query"],
});
