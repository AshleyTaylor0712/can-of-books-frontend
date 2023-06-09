import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';
import bookimg from './Book.jpg'
import { withAuth0 } from '@auth0/auth0-react'
import UpdateBooks from './UpdateBooks';


let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false,
      showUpdateModal: false,
      hasBooks: false,
      selectedBook: {}
    }
  }


  // Handle modal: Reveal this modal when the "Add Book" button is clicked, and hide the modal when the modal is closed.

  handleOpenModal = () => {
    this.setState({
      isModalDisplaying: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModalDisplaying: false,
      showUpdateModal: false
    })
  }

  openUpdateModal = (book) => {
    this.setState({
      showUpdateModal: true,
      selectedBook: book
    });
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    // Try could trigger an error if the if statement is false. So we must move auth0 out of the try catch.
    if (this.props.auth0.isAuthenticated) {
      try {

        //axios means we are going to get data from the backend
        let results = await axios.get(`${SERVER}/books`);
        console.log(results);
        this.setState({
          //filling empty books array from state with data from mongo db database
          books: results.data,
          hasBooks: true,
        })
      } catch (error) {
        console.log('we have an error: ', error.response.data)
      }
    }
  }

  postBooks = async (newBook) => {
    console.log("HEYO")
    try {
      //axios means we are going to get data from the backend
      let results = await axios.post(`${SERVER}/books`, newBook);
      console.log(results);
      this.setState({
        //filling empty books array from state with data from mongo db database
        // ... takes all the values in the array, then adds results.data
        books: [...this.state.books, results.data],
      })
      console.log(newBook)
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  // Is there a way to do this without changing the code pattern?
  deleteBooks = async (id) => {
    try {
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(books => books._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }

  putBooks = async (bookToUpdate) => {
    console.log(bookToUpdate)
    try {
      let url = `${SERVER}/books/${bookToUpdate._id}`;
      console.log(url)
      let updatedBook = await axios.put(url, bookToUpdate);
      console.log(updatedBook)
      console.log(this.state.books)
      let updatedBooks = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
        ? updatedBook.data
        : existingBook;
      });
      this.setState({
        showUpdateModal: false,
        books: updatedBooks,
      })
    } catch (error) {
      console.log('we have an error: ', error.response.data)
    }
  }


  // the next effect of this is when the site loads (specifically this component — it has all it needs), the data will be there
  componentDidMount() {
    this.getBooks();
  }

  //render is a space where i can define variables
  render() {

    /* TODO: render all the books in a Carousel */
    //mapping over the array of all of the books. we want to create a carsoul item for each one.
    //callback function of map is gettign both the book & index
    //indes represents the index/position of the current item in array
    //book represents individual book object


    console.log(this.state.hasBooks);
    let carouselSlides = this.state.books.map((book, index) => {
      //need the word return with a mutliline .map
      //console.log(book);
      return (
        <Carousel.Item key={index}>
          <img src={bookimg} alt='books' />
          <Carousel.Caption>

            <h3>
              {/* accessing the value of title on the book object */}
              title={book.title}
            </h3>

            <p>
              {/* accessing the value of description on the book object */}
              description={book.description}
            </p>

            {/* () prevents all of our books from getting deleted */}
            <Button onClick={() => this.deleteBooks(book._id)}>delete</Button>
            {/* () prevents all of our books from getting updated */}
            <Button onClick={() => this.openUpdateModal(book)}>Update</Button>
        
           



          </Carousel.Caption>
        </Carousel.Item>
      )
    });

    //this is where my data is showing up in the browser
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <div>Books:</div>

        <Carousel>
          {carouselSlides}
        </Carousel>;

        <BookFormModal
        show={this.state.isModalDisplaying}
        onHide={this.handleCloseModal}
        BookFormModal={this.state.BookFormModal}
        postBooks={this.postBooks}
          // show={this.state.isModalDisplaying}
          // handleClose={this.handleCloseModal}
          // handleShow={this.handleShowModal}
          // handleBookSubmit={this.handleBookSubmit}
        />

        <UpdateBooks
          show={this.state.showUpdateModal}
          handleClose={this.handleCloseModal}
          // handleShow={this.handleShowModal}
          putBooks={this.putBooks}
          book={this.state.selectedBook}
        />

        <Button onClick={this.handleOpenModal}>
          addBook
        </Button>


      </>
    );
  }
}

export default withAuth0(BestBooks);





