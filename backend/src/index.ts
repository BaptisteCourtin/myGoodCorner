import "reflect-metadata";
const port = 4000;
import datasource from "./lib/datasource";

// ----- EXPRESS -----
// import express from "express";

// import adsRouter from "./routes/ads.routes";
// import categoriesRouter from "./routes/categories.routes";
// import tagsRouter from "./routes/tags.routes";

// import cors from "cors";

// const app = express();

// app.use(cors({ origin: ["http://localhost:3000"] })); //permet de spécifier QUI a le droit de contacter le backend
// app.use(express.json()); // middleware (modifie les req)

// app.get("/", function (req, res) {
//   res.send("Hello");
// });
// app.use("/ads", adsRouter);
// app.use("/categories", categoriesRouter);
// app.use("/tags", tagsRouter);

// app.listen(port, () => {
//   datasource.initialize();
//   console.log("lancé sur le port " + port);
// });

// ----- GraphQL -----
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// import typeDefs from "./typedefs";
// import resolvers from "./resolvers";

// const server = new ApolloServer<{}>({
//   typeDefs, // fichier à part qui rassemble les fichiers .graphql
//   resolvers, // fichier à part qui rassemble les fichiers .resolver.ts
// });

// async function main() {
//   await datasource.initialize();
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: port },
//   });

//   console.log(`🚀  Server ready at: ${url}`);
// }
// main();

// ----- TypeGraphQL -----
import { buildSchema } from "type-graphql";

import AdResolver from "./resolvers/Ad.resolver";
import CategoryResolver from "./resolvers/Category.resolver";
import TagResolver from "./resolvers/Tag.resolver";

async function main() {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });
  const server = new ApolloServer<{}>({
    schema,
  });

  await datasource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
main();
