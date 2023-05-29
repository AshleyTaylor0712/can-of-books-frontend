import React from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';

class UpdateBook extends React.Component {

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('!!!!!', e.target);
  //   let bookToUpdate = {
  //     title: e.target.title.value || this.props.book.title,
  //     description: e.target.description.value || this.props.book.description,
  //     status: e.target.status.checked || this.props.book.status,
  //     _id: this.props.book._id,
  //     __v: this.props.book.__v
  //   };
  //   this.props.putBooks(bookToUpdate)

  // }
  
  render() {

    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              {
                this.props.book
                  ? (
                    <Form onSubmit={this.props.handleBookSubmit}>
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
                      <Button type="submit" onClick={this.props.handleClose}>Update this Book! </Button>
                    </Form>
                  ) : <h1> That does not exist</h1>
              }
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default UpdateBook;