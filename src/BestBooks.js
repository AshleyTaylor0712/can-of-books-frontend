import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import Button from 'react-bootstrap/Button';



let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalDisplaying: false,
      hasBooks: false
    }
  }


  // Handle modal: Reveal this modal when the "Add Book" button is clicked, and hide the modal when the modal is closed.
  // handleSubmitButton =

  handleOpenModal = () => {
    this.setState({
      isModalDisplaying: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModalDisplaying: false
    })
  }


  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
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

  postBooks = async (newBook) => {
    console.log("HEYO")
    try {
      //axios means we are going to get data from the backend
      let results = await axios.post(`${SERVER}/books`, newBook);
      console.log(results);
      this.setState({
        //filling empty books array from state with data from mongo db database
        books: [...this.state.books, results.data],
      })
      console.log(newBook)
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
          <img src='https://s26162.pcdn.co/wp-content/uploads/2019/11/book-3998252_1920-Edited.jpg' alt='books' />
          <Carousel.Caption>

            <h3>
              {/* accessing the value of title on the book object */}
              title={book.title}
            </h3>

            <p>
              {/* accessing the value of description on the book object */}
              description={book.description}
            </p>

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
        />

        <Button onClick={this.handleOpenModal}>
          addBook
        </Button>


      </>
    );
  }
}

export default BestBooks;





