import React from 'react';
import { Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"


class BookFormModal extends React.Component {
    
    handleBookSubmit = (e) => {
        e.preventDefault();
        let newBook = {
            title: e.target.Title.value,
            description: e.target.Description.value,
            status: e.target.Status.checked,
        };
        this.props.postBooks(newBook)
    }

    // {/* Form must have: Title, description, and status. */}

    render() {
        return (

            <Modal show={this.props.show} onHide={this.props.onHide}>
                We love books almost as much as sharing them with others. Add yours here!
                <Modal.Body>
                    console.log(You are here)
                    <Form onSubmit={this.handleBookSubmit}>
                        <Form.Group controlId="Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text">
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Check type="checkbox" label="read" />
                        </Form.Group>
                    <Button type="submit">Add Book</Button>

                    </Form>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onHide}>
                        This closes this modal
                    </Button>
                </Modal.Footer>

            </Modal>
        )
    }
}


// return (
//     <main>
//         <Form.Group>
//             <Form.Label onSubmit={handleSubmit}>
//                 <form 
//                 <Form.Control as="select">
//                 </Form.Control>
//             </Form.Label>
//         </Form.Group>
//     </main>
// )


export default BookFormModal