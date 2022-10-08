import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
const port = process.env.PORT || 4000;

// create express and HTTP server
const app = express();
const httpServer = createServer(app);

// create websocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql", //serves over ws protocol
});

const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const serverCleanup = useServer({ schema }, wsServer);

// create apollo server
const apolloServer = new ApolloServer({
  schema,
  context,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, path:"/graphql" });  //serves over http protocol




httpServer.listen(port, ()=>{
  console.log("Apollo Server is up")
});
