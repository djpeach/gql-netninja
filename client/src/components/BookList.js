import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getAllBooks} from '../queries'

import BookDetails from './BookDetails'

class BookList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedBook: null
    }
  }

  changeSelectedBook = (bookId) => (e) => {
    this.setState({
      selectedBook: bookId
    })
  }

  displayBooks = () => {
    const {data} = this.props
    return !data.loading ? (
      data.books.map((book) => {
        return (
          <li key={book.id} onClick={this.changeSelectedBook(book.id)}>{book.name}</li>
        )
      })
    ) : (
      <p>Loading books . . .</p>
    )
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selectedBook}/>
      </div>
    )
  }
}

export default graphql(getAllBooks)(BookList)
