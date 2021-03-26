const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const password = process.argv[2]
const MONGODB_URI = `mongodb+srv://fullstack:${password}@fullstack-opdpp.mongodb.net/library?retryWrites=true`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author]!
  }

  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
        return Book.find({})
        //let resultBooks = books.concat()
        //if (args.author)
        //  resultBooks = resultBooks.filter(b => b.author === args.author)
        //if (args.genre)
        //  resultBooks = resultBooks.filter(b => b.genres.includes(args.genre))
        //return resultBooks
    },
    allAuthors: () => {
      return Author.find({})
    }
  },
  Book: {
    author: async (root, args) => {
      const author = await Author.findById(root.author)
      return {
        name: author.name,
        born: author.born,
      }
    }
  },
  Author: {
    bookCount: (root) => root.books.length
  },
  Mutation: {
    addBook: async (root, args) => {

      let author = await Author.findOne({ name: args.author})

      if (!author) {
        author = new Author({ name: args.author})
      }

      const book = new Book({ 
        title: args.title,
        published: args.published,
        author: author,
        genres: args.genres
      })

      author.books = author.books.concat(book)
      await author.save()
      await book.save()
      
      return book
    },
    //editAuthor: (root, args) => {
    //  const author = authors.find(a => a.name === args.name)  
    //  if (!author)
    //    return null
    //  
    //  const updAuthor = { ...author, born: args.setBornTo}
    //  authors = authors.map(a => a.name === args.name ? updAuthor : a)
    //  return updAuthor
    //}
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})