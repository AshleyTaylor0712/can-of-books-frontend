import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';

class UpdateBook extends React.Component {
  
  handleSubmit = (e) => {
    console.log("READY OR NOT")
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.props.book.title,
      description: e.target.description.value || this.props.book.description,
      status: e.target.status.checked || this.props.book.status,
      _id: this.props.book._id,
      __v: this.props.book.__v
    };
    this.props.putBooks(bookToUpdate)
  }
  
  // Update book need to have access to putBooks
  
  render() {
    console.log(this.props.book)

    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Update your book information here </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {
                this.props.book
                  ? (
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="title">
                        <Form.Label> Title</Form.Label>
                        <Form.Control type="text" placeholder={this.props.book.title} />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control type="text" placeholder={this.props.book.description} />
                      </Form.Group>
                      <Form.Group controlId="status">
                        <Form.Check type="checkbox" label="Have You Read This" />
                      </Form.Group>
                      <Button type="submit" onClick={this.props.handleClose}>Update this Book </Button>
                    </Form>
                  ) : (<h1> That does not exist</h1>)

              }
            </Container>
          </Modal.Body>
          <Modal.Footer>


          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default UpdateBook;