import { Like, Repository } from "typeorm";
import { AdCreateInput } from "../types/ad";

import AdEntity from "../entities/Ad.entity";
import TagEntity from "../entities/Tag.entity";

import datasource from "../lib/datasource";
import CategoriesService from "./categories.service";
import TagsService from "./tags.service";
import CategoryEntity from "../entities/Category.entity";

class AdService {
  dbORM: Repository<AdEntity>;

  constructor() {
    this.dbORM = datasource.getRepository(AdEntity);
  }

  async list(search?: string) {
    const result = this.dbORM.find({
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
    const result = await this.dbORM.findOne({
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
    const result = await this.dbORM.findOne({
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

  async create(data: AdCreateInput) {
    let tags: TagEntity[] = [];
    if (data.tags?.length) {
      tags = await new TagsService().list();
    }

    if (data.category) {
      const category: CategoryEntity = await new CategoriesService().find(
        data.category
      );
      const newAd = this.dbORM.create({ ...data, category, tags }); //newAd attend une categorie. Si la catégorie n'est pas trouvée, le find juste au dessus lèvera une erreur, sinon nous arriverons ici
      await this.dbORM.save(newAd);
    } else {
      const newAd = this.dbORM.create({ ...data, tags });
      await this.dbORM.save(newAd);
    }

    return await this.list();
  }

  // ---

  // async patch(id: number, data: Partial<AdEntity>) {
  //   const ad = await this.find(id);
  //   const adMerge = this.dbORM.merge(ad, data);
  //   await this.dbORM.update(id, adMerge);

  //   return await this.find(id);
  // }

  async patch(
    id: number,
    { tags, ...data }: Partial<AdEntity> & { tags: string[] }
  ) {
    const ad = await this.find(id);
    const newInfos = this.dbORM.merge(ad, data);
    let listTags: TagEntity[] = [];

    if (tags?.length) {
      listTags = await new TagsService().list(tags);
    }

    const result = listTags.reduce((acc, item) => {
      return acc.includes(item) ? acc : [...acc, item];
    }, [] as TagEntity[]);

    newInfos.tags = result;
    return await this.dbORM.save(newInfos);
  }

  // ---

  async delete(id: number) {
    const ad = await this.find(id);
    await this.dbORM.remove(ad);
    return await this.list();
  }
}

export default AdService;
