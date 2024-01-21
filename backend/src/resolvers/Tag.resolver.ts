import { Arg, Mutation, Query } from "type-graphql";
import TagEntity, {
  TagCreateEntity,
  TagUpdateEntity,
} from "../entities/Tag.entity";
import TagsService from "../services/tags.service";

export default class TagResolver {
  @Query(() => [TagEntity])
  async getListTags() {
    const result: TagEntity[] = await new TagsService().list();
    return result;
  }

  @Query(() => TagEntity)
  async getTagById(@Arg("id") id: string) {
    const result: TagEntity = await new TagsService().find(+id);
    return result;
  }

  // ---

  @Mutation(() => TagEntity)
  async createTag(@Arg("infos") infos: TagCreateEntity) {
    const result: TagEntity[] = await new TagsService().create(infos);
    return result;
  }

  @Mutation(() => TagEntity)
  async patchTag(@Arg("id") id: string, @Arg("infos") infos: TagCreateEntity) {
    const result: TagEntity = await new TagsService().patch(+id, infos);
    return result;
  }

  @Mutation(() => [TagEntity])
  async deleteTag(@Arg("id") id: string) {
    const result: TagEntity[] = await new TagsService().delete(+id);
    return result;
  }
}

// export default {
//   Query: {
//     getListTags: async () => {
//       const result: TagEntity[] = await new TagsService().list();
//       return result;
//     },

//     getTagById: async (_: any, { id }: { id: string }) => {
//       const result: TagEntity = await new TagsService().find(+id);
//       return result;
//     },
//   },

//   // ---

//   Mutation: {
//     createTag: async (_: any, { infos }: { infos: TagCreateInput }) => {
//       const result: TagEntity[] = await new TagsService().create({
//         name,
//       });
//       return result;
//     },

//     patchTag: async (
//       _: any,
//       { id }: { id: string },
//       { infos }: { infos: Partial<TagEntity> }
//     ) => {
//       const result: TagEntity = await new TagsService().patch(+id, infos);
//       return result;
//     },

//     deleteTag: async (_: any, { id }: { id: string }) => {
//       const result: TagEntity[] = await new TagsService().delete(+id);
//       return result;
//     },
//   },
// };
