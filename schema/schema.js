/*- You can create the relacionships of thath types. */
// Route query s allows o describe this connections

const graphql = require('graphql');
const _ = require('lodash')

const usersData = [
  {id: "1", name:"Draymond Green", age: 35, profession: "Doctor"},
  {id: "2", name:"Rudy Gobert", age: 34, profession: "Salesman"},
  {id: "3", name:"Matisse Thybulle", age: 36, profession: "Accountant"},
  {id: "4", name:"Marcus Smart", age: 29, profession: "Architect"},
  {id: "5", name:"Mikal Bridges", age: 24, profession: "Astronomer"},
  {id: "6", name:"Gary Trent Jr.", age: 22, profession: "Butcher"},
];

const hobbiesData = [
  {id: '1', title: 'Swimming', description: 'Swimming is an individual or team racing sport that requires the use of one`s entire body to move through water. '},
  {id: '2', title: 'Taekwondo', description: 'Taekwondo, Tae Kwon Do or Taekwon-Do is a Korean form of martial arts, characterized by punching and kicking techniques'},
  {id: '3', title: 'Hiking', description: 'Hiking is a long, vigorous walk, usually on trails or footpaths in the countryside.'},
  {id: '4', title: 'Graffiti', description: 'Se llama grafiti, ​grafito​o pintada ​​ a una modalidad de pintura libre, destacada por su ilegalidad, generalmente realizada en espacios urbanos.'},
  {id: '5', title: 'Ghost hunting', description: 'Ghost hunting is the process of investigating locations that are reported to be haunted by ghosts.'},
];

const postData = [
  {id: "1", comment: "Building a mind"},
  {id: "2", comment: "GraphQl is Amazing"},
  {id: "3", comment: "How to change the world"},
];

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
    age: { type: GraphQLInt },
    profession: {type: GraphQLString}
  })
});

const HobbyType = new graphql.GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description Type...',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Description type...',
  fields: () => ({
    id: {type: GraphQLID},
    comment: {type: GraphQLString}
  }),
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
        return _.find(usersData, {id: args.id})
      }
    },
    hobby: {
      type: HobbyType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(hobbiesData, {id: args.id});
      }
    },
    post: {
      type: PostType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(postData, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});