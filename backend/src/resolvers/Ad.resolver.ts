import { Arg, Mutation, Query } from "type-graphql";
import AdEntity, {
  AdCreateEntity,
  AdUpdateEntity,
} from "../entities/Ad.entity";
import AdsService from "../services/ads.service";

export default class AdResolver {
  @Query(() => [AdEntity])
  async getListAd(@Arg("search") search: string) {
    const result: AdEntity[] = await new AdsService().list(
      search as any as string | undefined
    );
    return result;
  }

  @Query(() => AdEntity)
  async getAdById(@Arg("id") id: string) {
    const result: AdEntity = await new AdsService().find(+id);
    return result;
  }

  @Query(() => AdEntity)
  async getAdBySlug(@Arg("slug") slug: string) {
    const result: AdEntity = await new AdsService().findBySlug(slug);
    return result;
  }

  // ---

  @Mutation(() => [AdEntity])
  async createAd(@Arg("infos") infos: AdCreateEntity) {
    const result: AdEntity = await new AdsService().create({
      infos,
      tags: [],
    });
    return result;
  }

  @Mutation(() => AdEntity)
  async patchAd(@Arg("id") id: string, @Arg("infos") infos: AdUpdateEntity) {
    const result: AdEntity = await new AdsService().patch(+id, infos);
    return result;
  }

  @Mutation(() => [AdEntity])
  async deleteAd(@Arg("id") id: string) {
    const result: AdEntity[] = await new AdsService().delete(+id);
    return result;
  }
}

// export default {
//   Query: {
//     getListAds: async (_: any, { search }: { search: string }) => {
//       const result: AdEntity[] = await new AdsService().list(
//         search as any as string | undefined
//       );
//       return result;
//     },

//     getAdById: async (_: any, { id }: { id: string }) => {
//       const result: AdEntity = await new AdsService().find(+id);
//       return result;
//     },

//     getAdBySlug: async (_: any, { slug }: { slug: string }) => {
//       const result: AdEntity = await new AdsService().findBySlug(slug);
//       return result;
//     },
//   },

//   // ---

//   Mutation: {
//     createAd: async (_: any, { infos }: { infos: AdCreateInput }) => {
//       const result: AdEntity[] = await new AdsService().create(infos);
//       return result;
//     },

//     patchAd: async (
//       _: any,
//       { id }: { id: string },
//       { infos }: { infos: Partial<AdEntity> }
//     ) => {
//       const result: AdEntity = await new AdsService().patch(
//         +id,
//         infos as Partial<AdEntity> & { tags: string[] }
//       );
//       return result;
//     },

//     deleteAd: async (_: any, { id }: { id: string }) => {
//       const result: AdEntity[] = await new AdsService().delete(+id);
//       return result;
//     },
//   },
// };
