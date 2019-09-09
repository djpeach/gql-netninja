import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {getAllAuthors, addBook, getAllBooks} from '../queries'
import {flowRight as compose} from 'lodash'

class AddBook extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }

  displayAuthors = () => {
    const {getAllAuthors} = this.props
    return !getAllAuthors.loading ? (
      getAllAuthors.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    ) : (
      <option disabled value=''>Loading Athors . . .</option>
    )
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    const {name, genre, authorId} = this.state
    e.preventDefault()
    this.props.addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{query: getAllBooks}]
    })
  }

  render() {
    const {state} = this
    return (
      <form id="add-book" onSubmit={this.onSubmit}>
        <div className="field">
          <label htmlFor="book-name">Book name:</label>
          <input id='name' type="text" name="book-name" onChange={this.onChange} value={state.name}/>
        </div>
        <div className="field">
          <label htmlFor="book-genre">Book name:</label>
          <input id='genre' type="text" name="book-genre" onChange={this.onChange} value={state.genre}/>
        </div>
        <div className="field">
          <label htmlFor="book-author">Book name:</label>
          <select id='authorId' name="book-author" onChange={this.onChange} value={state.authorId}>
            <option disabled value=''>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default compose(
  graphql(getAllAuthors, {name: 'getAllAuthors'}),
  graphql(addBook, {name: 'addBook'}),
)(AddBook)
