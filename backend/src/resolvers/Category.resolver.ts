import { Arg, Mutation, Query } from "type-graphql";
import CategoryEntity, {
  CategoryCreateEntity,
  CategoryUpdateEntity,
} from "../entities/Category.entity";
import CategoriesService from "../services/categories.service";

export default class CategoryResolver {
  @Query(() => [CategoryEntity])
  async getListCategories() {
    const result: CategoryEntity[] = await new CategoriesService().list();
    return result;
  }

  @Query(() => CategoryEntity)
  async getCategoryById(@Arg("id") id: string) {
    const result: CategoryEntity = await new CategoriesService().find(+id);
    return result;
  }

  // ---

  @Mutation(() => CategoryEntity)
  async createCategory(@Arg("infos") infos: CategoryCreateEntity) {
    const result: CategoryEntity[] = await new CategoriesService().create(
      infos
    );
    return result;
  }

  @Mutation(() => CategoryEntity)
  async patchCategory(
    @Arg("id") id: string,
    @Arg("infos") infos: CategoryCreateEntity
  ) {
    const result: CategoryEntity = await new CategoriesService().patch(
      +id,
      infos
    );
    return result;
  }

  @Mutation(() => [CategoryEntity])
  async deleteCategory(@Arg("id") id: string) {
    const result: CategoryEntity[] = await new CategoriesService().delete(+id);
    return result;
  }
}

// export default {
//   Query: {
//     getListCategories: async () => {
//       const result: CategoryEntity[] = await new CategoriesService().list();
//       return result;
//     },

//     getCategoryById: async (_: any, { id }: { id: string }) => {
//       const result: CategoryEntity = await new CategoriesService().find(+id);
//       return result;
//     },
//   },

//   // ---

//   Mutation: {
//     createCategory: async (
//       _: any,
//       { infos }: { infos: CategoryCreateInput }
//     ) => {
//       const result: CategoryEntity[] = await new CategoriesService().create({
//         infos,
//       });
//       return result;
//     },

//     patchCategory: async (
//       _: any,
//       { id }: { id: string },
//       { infos }: { infos: Partial<CategoryEntity> }
//     ) => {
//       const result: CategoryEntity[] = await new CategoriesService().patch(
//         +id,
//         infos
//       );
//       return result;
//     },

//     deleteCategory: async (_: any, { id }: { id: string }) => {
//       const result: CategoryEntity[] = await new CategoriesService().delete(
//         +id
//       );
//       return result;
//     },
//   },
// };
