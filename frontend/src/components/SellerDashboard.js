import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import './SellerDashboard.css';
import axios from 'axios';

function SellerDashboard() {
  const onSubmit = (e) => {
    e.preventDefault();
    const time = Date.now()/1000;
    const obj = {
      name: e.target.product.value,
      description: e.target.description.value,
      condition: e.target.condition.value,
      price: e.target.price.value,
      numberAvailable: e.target.numberAvailable.value,
      pickupLocation: e.target.pickupLocation.value,
      negotiable: false,
      datePosted: time,
      bought:false,
    };
    submitProduct(obj);
    console.log(obj)
  };
  const submitProduct = (post) => {
    axios.post("http://localhost:9000/products/create", post);
  };
  return (
    <>
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name Of Product</Form.Label>
        <Form.Control placeholder="Name" name = "product"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="Description" name="description"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Condition</Form.Label>
        <Form.Select name="condition">
          <option>Used</option>
          <option>Acceptable</option>
          <option>Good</option>
          <option>Very Good</option>
          <option>Like New</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Listing Price</Form.Label>
        <Form.Control placeholder="Price ($)" name="price" type="number" min="1" step="any"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Units Available</Form.Label>
        <Form.Control placeholder="Quantity" name="numberAvailable"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Pickup Location</Form.Label>
        <Form.Control placeholder="Location" name="pickupLocation"/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Negotiable</Form.Label>
        <Form.Select name="negotiable">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>
    </>
  );
}

export default SellerDashboard;