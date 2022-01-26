/*- You can create the relacionships of thath types. */

// Route query s allows o describe this connections

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;

// Create types

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  descripion: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

//RouteQuery: The path that allows to start trasversing a query

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Descripion',
  fields: {
    user: {
      type: UserType,
      args:{id: {type: GraphQLString}},
      resolve(parent, args){

      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})