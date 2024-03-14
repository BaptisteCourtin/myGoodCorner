import { Repository } from "typeorm";

import CategoryEntity, {
  CategoryCreateEntity,
} from "../entities/Category.entity";
import AdEntity from "../entities/Ad.entity";

import datasource from "../lib/datasource";

class CategoriesService {
  db: Repository<CategoryEntity>;
  dbAds: Repository<AdEntity>;

  constructor() {
    this.db = datasource.getRepository(CategoryEntity);
    this.dbAds = datasource.getRepository(AdEntity);
  }

  async list() {
    const result = await this.db.find({ relations: { ads: true } });
    if (!result) {
      throw new Error("Pas de category");
    }
    return result;
  }

  async find(id: number, limit?: number, skip?: number) {
    const category = await this.db.findOneBy({ id });
    if (!category) {
      throw new Error("La catégorie n'existe pas");
    }
    // const ads = await this.dbAds.findAndCountBy({
    //   category: { id: category.id },
    // });
    const ads = await this.dbAds.findAndCount({
      where: { category: { id: category.id } },
      skip: skip,
      take: limit,
    });
    if (!category) {
      throw new Error("La catégorie n'existe pas");
    }
    return { category, ads: ads[0], count: ads[1] };
  }

  // ---

  async create(data: Partial<CategoryCreateEntity>) {
    const newCategory = this.db.create(data);
    return await this.db.save(newCategory);
  }

  // ---

  async patch(id: number, data: Partial<CategoryEntity>) {
    const category = (await this.find(id)).category;
    const newInfos = this.db.merge(category, data); // le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.db.save(newInfos);
  }

  // ---

  async delete(id: number) {
    const category = (await this.find(id)).category;
    await this.db.remove(category);
    return await this.list();
    // return "CATEGORY DELETE";
  }
}

export default CategoriesService;
