// import "reflect-metadata";
// import datasource from "./lib/datasource";
// const port = 4000;

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
// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
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
// import { buildSchema } from "type-graphql";

// import AdResolver from "./resolvers/Ad.resolver";
// import CategoryResolver from "./resolvers/Category.resolver";
// import TagResolver from "./resolvers/Tag.resolver";

// async function main() {
//   const schema = await buildSchema({
//     resolvers: [AdResolver, CategoryResolver, TagResolver],
//   });
//   const server = new ApolloServer<{}>({
//     schema,
//   });

//   await datasource.initialize();
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: port },
//   });

//   console.log(`🚀  Server ready at: ${url}`);
// }
// main();

// --- avec les cors et docker ---
import "reflect-metadata";
import datasource from "./lib/datasource";

import AdResolver from "./resolvers/Ad.resolver";
import CategoryResolver from "./resolvers/Category.resolver";
import TagResolver from "./resolvers/Tag.resolver";

import { buildSchema } from "type-graphql";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
    validate: false,
  });
  const server = new ApolloServer<{}>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server)
  );

  await datasource.initialize(); // .env ?

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
