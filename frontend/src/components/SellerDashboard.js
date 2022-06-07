import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import './SellerDashboard.css';

function SellerDashboard() {
  return (
    <Container className = "container">
      <Card className = 'seller-card' >
      <Card.Img variant="top" src="image" />
        <Card.Body>
          <Card.Title>Wahoo Shirt</Card.Title>
          <Card.Text>
            Looking to sell multiple old shirts. 
            Price: $15
          </Card.Text>
          <Button variant="primary">Buy</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SellerDashboard;