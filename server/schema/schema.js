const gql = require('graphql')
const _ = require('lodash')
const BookSchema = require('../models/Book')
const AuthorSchema = require('../models/Author')

const BookType = new gql.GraphQLObjectType({
  name: 'Book',
  fields: () => {
    return {
      id: { type: gql.GraphQLID },
      name: { type: gql.GraphQLString },
      genre: { type: gql.GraphQLString },
      author: {
        type: AuthorType,
        resolve(parent, args) {
          return AuthorSchema.findById(parent.authorId)
        }
      }
    }
  }
})

const AuthorType = new gql.GraphQLObjectType({
  name: 'Author',
  fields: () => {
    return {
      id: { type: gql.GraphQLID },
      name: { type: gql.GraphQLString },
      age: { type: gql.GraphQLInt },
      books: {
        type: new gql.GraphQLList(BookType),
        resolve(parent, args) {
          return BookSchema.find({authorId: parent.id})
        }
      }
    }
  }
})

const RootQuery = new gql.GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: gql.GraphQLID }
      },
      resolve(parent, args) {
        return BookSchema.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: gql.GraphQLID }
      },
      resolve(parent, args) {
        return AuthorSchema.findById(args.id)
      }
    },
    books: {
      type: new gql.GraphQLList(BookType),
      resolve(parent, args) {
        return BookSchema.find({})
      }
    },
    authors: {
      type: new gql.GraphQLList(AuthorType),
      resolve(parent, args) {
        return AuthorSchema.find({})
      }
    }
  }
})

const Mutation = new gql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
        age: { type: gql.GraphQLInt }
      },
      resolve(parent, args) {
        const author = new AuthorSchema({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
        genre: { type: new gql.GraphQLNonNull(gql.GraphQLString) },
        authorId: { type: new gql.GraphQLNonNull(gql.GraphQLID) },
      },
      resolve(parent, args) {
        const book = new BookSchema({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new gql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
