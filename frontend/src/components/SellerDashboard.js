import React, {useContext, useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import {UserIDContext} from "../UserIDContext";
import Form from 'react-bootstrap/Form';
import './SellerDashboard.css';
import axios from 'axios';

function SellerDashboard() {
  const {curUserID} = useContext(UserIDContext);
  const [currUserData, setCurrUserData] = useState();
  const [currProductData, setCurrProductData] = useState();
  console.log(currUserData)
  //console.log(currUserData.result[0]) //displays product IDs under user (when logged in)

  const getData = () => {
    if (currUserData){
      console.log("user data here")
      let products = [];
      currUserData.productsSelling.forEach((item) => {
        fetch("http://localhost:9000/products/info/" + item._key.path.segments[6])
        .then((res) => res.json())
        .then((data) =>
        {products.push({...data})}
      )
      })
      setCurrProductData(products)
      console.log(products)
    }
    
    else{
      fetch("http://localhost:9000/users/info/" + curUserID)
      .then((res) => res.json())
      .then((data) => setCurrUserData(data.result))
    }
  }
  //need to change this function to retrieve each product under currUserData
  useEffect(() => {
    getData(); 
  }, [])
  console.log(currProductData)


  
  const ProductDisplay = (props) => (
    <section>
      <div className = 'checkoutPage'>
        <div className="product">
          <div className="description">
          <h4>{props.id}</h4>
          </div>
        </div>
      </div>
    </section>
    
  );
  const onSubmit = (e) => {
    e.preventDefault();
    const time = Date.now()/1000;
    const pricing = parseFloat(e.target.price.valueAsNumber).toFixed(2)
    const obj = {
      name: e.target.product.value,
      description: e.target.description.value,
      condition: e.target.condition.value,
      price: parseFloat(pricing),
      numberAvailable: e.target.numberAvailable.value,
      pickupLocation: e.target.pickupLocation.value,
      negotiable: false,
      datePosted: time,
      bought: false,
    };

    submitProduct(obj);
    alert("Product posted!")
  };
  const submitProduct = (post) => {
    var postID;
    console.log(post.name)
    axios.post("http://localhost:9000/products/create", post).then((res)=> {
      postID = res.data;
      axios.put("http://localhost:9000/users/addProduct/"+curUserID+"/"+postID +"/")
    })
  };

  if(currUserData && currProductData) {
  return (
    <div style={{display: "flex", justifyContent: "space-evenly"}}>
    <div style={{margin: 25, minWidth: 450, borderRightWidth: 2, borderRightStyle: "dashed", paddingRight: 50}}>
      <h1>Post New Listing</h1>
    {/* Displays the IDs here, uncomment this*/}
    {/* {currProductData.length > 0 &&
          currProductData.map((val, key) => {
            return <ProductDisplay id={val.id} />;
          })} */}
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
        <Form.Control placeholder="Price ($)" name="price" type="number" min="0.01" step="any"/>
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
    </div>
    <div style={{margin: 25, minWidth: 450}}>
      <h1>Current Listings</h1>
      {console.log(currProductData)}
      {currProductData.map((product) => <ProductListing product={product}/>)}
    </div>
    </div>
  );
        }
        else {
          getData(); 
        }
}

const ProductListing = (props) => {
  const product = props.product; 
  console.log(product); 
  if(product.image) {
    return(
      <div style={{margin: 15, padding: 15, borderWidth: 1, borderRadius: 10, borderStyle: "solid"}}>
        <h3>{product.name}</h3>
        <div style={{display: "flex"}}>
          <img style={{width: 180, height: "auto", margin: 10}} src={product.image} alt={"product image"} />
          <p>{product.description}</p>
        </div>
        <p>Price: ${product.price}</p>
        <p>Quantity available: {product.numberAvailable}</p>
        <p>Condition: {product.condition}</p>
      </div>
    ); 
  }
  else {
    return(
      <div style={{margin: 15}}>
        <h3>{product.name}</h3>
        <div style={{display: "flex"}}>
          <p>{product.description}</p>
        </div>
        <p>Price: ${product.price}</p>
        <p>Quantity available: {product.numberAvailable}</p>
        <p>Condition: {product.condition}</p>
      </div>
    ); 
  }
}

export default SellerDashboard;