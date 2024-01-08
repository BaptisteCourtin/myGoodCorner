import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers } from "@graphql-tools/merge";

const resolvers = loadFilesSync(".", { extensions: ["resolver.ts"] }); // ne pas mettre juste .ts si non il se charge lui même en boucle

export default mergeResolvers(resolvers);
