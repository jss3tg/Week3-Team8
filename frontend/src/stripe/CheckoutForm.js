import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckoutForm.css';
import {UserIDContext} from "../UserIDContext";

export const CheckoutForm = () => {
  const [cart, setCart] = useState(null);
  const [productsInfo, setProducts] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [message, setMessage] = useState(false);
  const {curUserID, setCurUserID} = useContext(UserIDContext); 
  let totalPrice = 0;
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if(!productsInfo) {
      getProductInfo(); 
    }
  }, [])

  const getProductInfo = () => {
    if (cart){
      let products=[];
      cart.forEach((item) => {
      fetch("http://localhost:9000/products/info/" + item.id)
      .then((res) => res.json())
      .then((data) =>
      {console.log(data)
        data.quantity = item.quantity
      products.push({...data})}
      )
    })
      setProducts(products)
      console.log(products)
    }
    else {
      console.log("no cart")
      fetch("http://localhost:9000/cart/"+ curUserID)
      .then((res) => res.json())
      .then((data) => {setCart(data.result); console.log("data set'")})
    }
  }

  function showConfirm() {
    if (window.confirm("Check over your order before moving to the payment window. Once you hit pay, the order will process.") == true) {
      setCheckout(!checkout)
    }   else {
    }
  }

  const ProductDisplay = (props) => (
    <section>
      <div className = 'checkoutPage'>
        <div className="product">
          <img
            src={props.image}
            alt="listing image"
            height="200px"
            width="200px"
          />
          <div className="description">
            <h4>{props.name}</h4>
            <h6>${props.price}</h6>
            <h6>quantity: {props.quantity}</h6>
          </div>
        </div>
      </div>
    </section>
    
  );

  const CheckoutDisplay = (props) => (
    <section>
      <div className = 'checkoutdisplaypage'>
          <h6>{props.name} ${props.price} quantity: {props.quantity}</h6>
      </div>
    </section>
    
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        console.log(totalPrice)
        const response = await axios.post(
          "http://localhost:8080/stripe/charge",
          {
            amount: totalPrice*100,
            id: id,
          }
        );

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
          setCheckout(!checkout);
          axios.put("http://localhost:9000/cart/clearCart/" + curUserID)
          setMessage(true);
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };
  if(productsInfo) {
    console.log(productsInfo)
  return checkout ? (
    <>
    <div className="checkoutHeader">
      <h1>CHECKOUT</h1>
    </div>


    <div className = "pagecontainer">
      <div className = "cardContainer">
        <form onSubmit = {handleSubmit} style={{ maxWidth: 400 }}>
            <h3 className="orange">Pay With Credit or Debit</h3>
            <div className = 'cardElement'>
            <CardElement /></div>
          <div className = 'paybutton'>
            <Button type='submit' class="btn btn-dark">Pay</Button>
          </div>
        </form>
        </div>
    <div className="checkoutpage">
      <div className = 'orderCheckout'>
        <h3 className="orangeOrder">Your Order</h3>
        {productsInfo.length > 0 &&
              productsInfo.map((val, key) => {
                totalPrice += val.price * val.quantity
                return <p><CheckoutDisplay name={val.name} price={val.price} quantity={val.quantity}/></p>
              })}
      </div>
      <h4 className = 'pricecheckout'>Total: ${parseFloat(totalPrice).toFixed(2)}</h4>
    </div>
    </div>
</>
    
  )
  :
  (
        <><div>
          <div className="checkoutHeader">
          {message ? <p>Success! Your order is now being processed. Thank you for shopping with Hoos Selling.</p>
          : <h1>Cart</h1>}</div>
        <div className = 'order'>
        {productsInfo.length > 0 &&
              productsInfo.map((val, key) => {
                totalPrice += val.price * val.quantity
                return <ProductDisplay name={val.name} price={val.price} quantity={val.quantity} image={val.image}/>
              })}
          {productsInfo.length===0 && <h3 className="cartIsEmpty">Cart is empty</h3>}
        <div className = 'checkoutcontainer'>
          <div className = 'price'>
            <h4>Total: ${parseFloat(totalPrice).toFixed(2)}</h4>
          </div>
          <div className='checkoutbutton'>
              <button type="button" onClick={() => showConfirm()} class="btn btn-dark">
                Checkout
              </button>
          </div>
          </div>
        </div>
        </div></>
  )}
  else {
    getProductInfo(); 
  }
};