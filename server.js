import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Query{
        greet: String
    }
`

const resolvers = {
    Query:{
        greet:()=>"Hello World"
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});