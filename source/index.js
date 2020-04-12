require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const TVDB = require("node-tvdb");

const tvdb = new TVDB(process.env.THE_TV_DB_API_KEY);

const typeDefs = gql`
  type Series {
    id: String!
    seriesName: String!
  }

  type Query {
    getSeriesByID(id: String!): Series
    getSeriesByName(name: String): [Series]
  }
`;

const resolvers = {
  Query: {
    getSeriesByID: async (_, { id }) => {
      const result = await tvdb
        .getSeriesById(id)
        .then((response) => response)
        .catch((error) => console.log(`getSeriesByID error: ${error}`));

      return result;
    },

    getSeriesByName: async (_, { name }) => {
      const result = await tvdb
        .getSeriesByName(name)
        .then((response) => response)
        .catch((error) => console.log(`getSeriesByName error: ${error}`));

      return result;
    },
  },
};

const schema = new ApolloServer({ typeDefs, resolvers });

schema.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
