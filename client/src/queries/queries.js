import {gql} from 'apollo-boost'

const getAllBooks = gql`
  {
    books {
      name
      id
    }
  }
`

const getAllAuthors = gql`
  {
    authors {
      name
      id
    }
  }
`

const addBook = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

const getBook = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`

export {getAllBooks, getAllAuthors, addBook, getBook}
