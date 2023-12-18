import { In, Repository } from "typeorm";
import datasource from "../lib/datasource";

import { TagCreateInput } from "../types/tag";
import TagEntity from "../entities/Tag.entity";

class TagsService {
  dbORM: Repository<TagEntity>;

  constructor() {
    this.dbORM = datasource.getRepository(TagEntity);
  }

  async list(tagIds?: string[]) {
    const result = await this.dbORM.find({
      where: {
        id: tagIds && tagIds.length > 0 ? In(tagIds.map((t) => +t)) : undefined,
      },
    });

    if (!result) {
      throw new Error("Pas de tag");
    }
    return result;
  }

  async find(id: number) {
    const result = await this.dbORM.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      throw new Error("La tag n'existe pas");
    }
    return result;
  }

  // ---

  async create(data: TagCreateInput) {
    const newTag = this.dbORM.create(data);
    await this.dbORM.save(newTag);
    return await this.list();
  }

  // ---

  async patch(id: number, data: Partial<TagEntity>) {
    const tag = await this.find(id);
    const tagMerge = this.dbORM.merge(tag, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.dbORM.save(tagMerge);
  }

  // ---

  async delete(id: number) {
    const tag = await this.find(id);
    await this.dbORM.remove(tag);
    return await this.list();
  }
}

export default TagsService;
