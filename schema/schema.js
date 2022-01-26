/*- You can create the relacionships of thath types. */

// Route query s allows o describe this connections

const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = graphql;

// Create types

const USerype = new graphql.GraphQLEnumType({
  name: 'User',
  descripion: 'Documentation for user...',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});