import { Like, Repository } from "typeorm";
import datasource from "../lib/datasource";

import AdEntity, {
  AdCreateEntity,
  AdUpdateEntity,
} from "../entities/Ad.entity";
import TagEntity from "../entities/Tag.entity";
import CategoryEntity from "../entities/Category.entity";

import CategoriesService from "./categories.service";
import TagsService from "./tags.service";

class AdsService {
  db: Repository<AdEntity>;
  dbTag: Repository<TagEntity>;

  constructor() {
    this.db = datasource.getRepository(AdEntity);
    this.dbTag = datasource.getRepository(TagEntity);
  }

  async list(search?: string) {
    const result = await this.db.find({
      relations: { category: true, tags: true }, //permet de récupérer la jointure faite entre ad et category et entre ad et tags
      where: search
        ? [
            //si le where est un tableau on a un WHERE OR sinon, si vous mettez un objet, c'est un WHERE AND
            { title: Like(`%${search}%`) },
            { tags: { name: Like(`%${search}%`) } },
          ]
        : undefined,
    });

    if (!result) {
      throw new Error("Pas d'annonce");
    }
    return result;
  }

  async find(id: number) {
    const result = await this.db.findOne({
      where: {
        id: id,
      },
      relations: {
        category: true,
        tags: true,
      },
    });

    if (!result) {
      throw new Error("L'annonce n'existe pas");
    }
    return result;
  }

  async findBySlug(slug: string) {
    const result = await this.db.findOne({
      where: {
        slug: slug,
      },
      relations: {
        category: true,
        tags: true,
      },
    });

    if (!result) {
      throw new Error("L'annonce n'existe pas");
    }
    return result;
  }

  // ---

  async create(data: AdCreateEntity) {
    // const category: CategoryEntity = await new CategoriesService().find(
    //   +data.category.id
    // );
    const { category } = await new CategoriesService().find(+data.category.id);

    let tags: TagEntity[] = [];
    if (data.tags?.length) {
      tags = await new TagsService().list(data.tags);
    }

    const newAd = this.db.create({ ...data, category, tags }); //newAd attend une categorie. Si la catégorie n'est pas trouvée, le find juste au dessus lèvera une erreur, sinon nous arriverons ici
    return await this.db.save(newAd);
  }

  // ---

  async patch(id: number, { tags, ...data }: Partial<AdCreateEntity>) {
    const ad = await this.find(id);
    const infosMerge = this.db.merge(ad, data);
    let listTags: TagEntity[] = [];

    if (tags?.length) {
      listTags = await new TagsService().list(tags);
    }

    const result = listTags.reduce((acc, item) => {
      return acc.includes(item) ? acc : [...acc, item];
    }, [] as TagEntity[]);

    infosMerge.tags = result;
    return await this.db.save(infosMerge);
  }

  // ---

  async delete(id: number) {
    const ad = await this.find(id);
    await this.db.remove(ad);
    return await this.list();
  }
}

export default AdsService;
