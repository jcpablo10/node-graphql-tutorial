/*- You can create the relacionships of thath types. */
// Route query s allows o describe this connections

const graphql = require('graphql');
const _ = require('lodash');
const { resolve } = require('path/posix');

const usersData = [
  {id: "1", name:"Draymond Green", age: 35, profession: "Doctor"},
  {id: "2", name:"Rudy Gobert", age: 34, profession: "Salesman"},
  {id: "3", name:"Matisse Thybulle", age: 36, profession: "Accountant"},
  {id: "4", name:"Marcus Smart", age: 29, profession: "Architect"},
  {id: "5", name:"Mikal Bridges", age: 24, profession: "Astronomer"},
  {id: "6", name:"Gary Trent Jr.", age: 22, profession: "Butcher"},
];

const hobbiesData = [
  {id: '1', title: 'Swimming', description: 'Swimming is an individual or team racing sport that requires the use of one`s entire body to move through water. ', userId: "1"},
  {id: '2', title: 'Taekwondo', description: 'Taekwondo, Tae Kwon Do or Taekwon-Do is a Korean form of martial arts, characterized by punching and kicking techniques', userId: "1"},
  {id: '3', title: 'Hiking', description: 'Hiking is a long, vigorous walk, usually on trails or footpaths in the countryside.', userId: "2"},
  {id: '4', title: 'Graffiti', description: 'Se llama grafiti, ​grafito​o pintada ​​ a una modalidad de pintura libre, destacada por su ilegalidad, generalmente realizada en espacios urbanos.', userId: "3"},
  {id: '5', title: 'Ghost hunting', description: 'Ghost hunting is the process of investigating locations that are reported to be haunted by ghosts.', userId: "4"},
];

const postData = [
  {id: "1", comment: "Building a mind", userId: "1"},
  {id: "2", comment: "GraphQl is Amazing", userId: "1"},
  {id: "3", comment: "How to change the world", userId: "2"},
  {id: "4", comment: "How to change the world", userId: "3"},
  {id: "5", comment: "How to change the world", userId: "5"},
];

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

// Create types

const UserType = new graphql.GraphQLObjectType({
  name: 'User',
  descripion: 'Documentation for user...',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profession: {type: GraphQLString},
    posts: {
      type: new GraphQLList(PostType),
      description: "All post for a user given",
      resolve(parent, args) {
        return _.filter(postData, {userId: parent.id});
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      description: "All hobbies for a user given",
      resolve(parent, args) {
        return _.filter(hobbiesData, {userId: parent.id});
      }
    },
  })
});

const HobbyType = new graphql.GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description Type...',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(usersData, {id: parent.userId});
      }
    }
  })
});

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Description type...',
  fields: () => ({
    id: {type: GraphQLID},
    comment: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        console.log(parent)
        return _.find(usersData, {id: parent.userId});
      }
    }
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
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return usersData;
      }
    },
    hobby: {
      type: HobbyType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(hobbiesData, {id: args.id});
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, array) {
        return hobbiesData;
      }
    },
    post: {
      type: PostType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        return _.find(postData, {id: args.id});
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return postData;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        profession: { type: GraphQLString }
      },
      resolve(parent, args){
        let user = {
          name: args.name,
          age: args.age,
          profession: args.profession
        }
        return user;
      }
    },
    createPost: {
      type: PostType,
      args: {
        comment: { type: GraphQLString },
        userId: {type: GraphQLID }
      },
      resolve(parent, args){
        let post = {
          comment: args.comment,
          userId: args.userId
        }
        return post;
      }
    },
    createHobby: {
      type: HobbyType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
      },
      resolve(parent, args){
        let hobbie = {
          title: args.title,
          description: args.description,
          userId: args.userId
        }
        return hobbie;
      },
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});