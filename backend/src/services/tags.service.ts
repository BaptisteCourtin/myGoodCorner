import { In, Repository } from "typeorm";

import TagEntity, {
  TagCreateEntity,
  TagUpdateEntity,
} from "../entities/Tag.entity";

import datasource from "../lib/datasource";

class TagsService {
  db: Repository<TagEntity>;

  constructor() {
    this.db = datasource.getRepository(TagEntity);
  }

  async list(tagIds?: string[]) {
    const result = await this.db.find({
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
    const result = await this.db.findOne({
      where: { id },
    });

    if (!result) {
      throw new Error("La tag n'existe pas");
    }
    return result;
  }

  // ---

  async create(data: TagCreateEntity) {
    const newTag = this.db.create(data);
    await this.db.save(newTag);
    return await this.list();
  }

  // ---

  async patch(id: number, data: Partial<TagEntity>) {
    const tag = await this.find(id);
    const tagMerge = this.db.merge(tag, data); // petite info, le merge permet d'ignorer les clés qui n'existent pas dans l'entité! vous voyez l'intéret d'un ORM? Tout est lié
    return await this.db.save(tagMerge);
  }

  // ---

  async delete(id: number) {
    const tag = await this.find(id);
    await this.db.remove(tag);
    return await this.list();
  }
}

export default TagsService;
