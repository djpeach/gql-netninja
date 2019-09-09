import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getBook} from '../queries'
import {flowRight as compose} from 'lodash'

class BookDetails extends Component {

  displayBookDetails = () => {
    const {getBookById} = this.props
    if (!getBookById.loading && !getBookById.error) {
      return <p>{getBookById.book.name}, written by {getBookById.book.author.name}</p>
    } else if (getBookById.laoding) {
      return <p>Loading Book Details...</p>
    } else {
      return <p>No book details yet</p>
    }
  }

  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default compose(
  graphql(getBook, {
    name: 'getBookById',
    options: (props) => {
      return {
        variables: {
          id: props.bookId
        }
      }
    }
  })
)(BookDetails)
