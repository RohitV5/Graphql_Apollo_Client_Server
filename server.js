import { ApolloServer, gql } from "apollo-server";
import typeDefs from "./typeDefs.js";
import  resolvers  from "./resolvers.js";
import  jwt  from "jsonwebtoken";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers,context:({req})=>{
    const {authorization}=req.headers;    
    if(authorization){
      const {userId} =  jwt.verify(authorization,process.env.JWT_SECRET);
      return {userId}
    }
} });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
