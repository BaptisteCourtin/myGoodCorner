import { Repository } from "typeorm";

import CategoryEntity, {
  CategoryCreateEntity,
  CategoryUpdateEntity,
} from "../entities/Category.entity";

import datasource from "../lib/datasource";

class CategoriesService {
  dbORM: Repository<CategoryEntity>;

  constructor() {
    this.dbORM = datasource.getRepository(CategoryEntity);
  }

  async list() {
    const result = await this.dbORM.find();

    if (!result) {
      throw new Error("Pas de category");
    }
    return result;
  }

  async find(id: number) {
    const result = await this.dbORM.findOne({
      where: { id },
      relations: { ads: true },
    });

    if (!result) {
      throw new Error("La category n'existe pas");
    }
    return result;
  }

  // ---

  async create(data: CategoryCreateEntity) {
    const newCategory = this.dbORM.create(data);
    await this.dbORM.save(newCategory);
    return await this.list();
  }

  // ---

  async patch(id: number, data: Partial<CategoryEntity>) {
    const category = await this.find(id);
    const newInfos = this.dbORM.merge(category, data);

    return await this.dbORM.save(newInfos);
  }

  // ---

  async delete(id: number) {
    const category = await this.find(id);
    await this.dbORM.remove(category);
    return await this.list();
  }
}

export default CategoriesService;
