import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CheckoutForm.css';


export const CheckoutForm = () => {

  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [message, setMessage] = useState(false)
  let totalPrice = 0;

  useEffect(() => {
    fetch("http://localhost:9000/products/info")
    .then((res) => res.json())
    .then((data) => setProducts(data.result))
  }, [])

  const stripe = useStripe();
  const elements = useElements();


  const ProductDisplay = (props) => (
    <section>
      <div className = 'checkoutPage'>
        <div className="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
            height="200px"
  
          />
          <div className="description">
          <h4>{props.name}</h4>
          <h6>${props.price}</h6>
          </div>
        </div>
      </div>
    </section>
    
  );

  const CheckoutDisplay = (props) => (
    <section>
      <div className = 'checkoutdisplaypage'>
          <h6>{props.name} ${props.price}</h6>
      </div>
    </section>
    
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement, {style: {
        base: {
          iconColor: '#c4f0ff',
          color: '#fff',
          fontWeight: '500',
          fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
          fontSize: '16px',
          fontSmoothing: 'antialiased',
          ':-webkit-autofill': {
            color: '#fce883',
          },
          '::placeholder': {
            color: '#87BBFD',
          },
        },
        invalid: {
          iconColor: '#FFC7EE',
          color: '#FFC7EE',
        },
      },}),
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
          setMessage(true);
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return checkout ? (
    <>
    <div className="checkoutHeader">
      <h1>CHECKOUT</h1>
    </div>


    <div className = "pagecontainer">
      <div className = "cardContainer">
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <h3 className="orange">Pay With Credit or Debit</h3>
            <div className = 'cardElement'>
            <CardElement /></div>
          <div className = 'paybutton'>
            <Button type='submit' class="btn btn-dark">Complete Purchase</Button>
          </div>
        </form>
        </div>
    <div className="checkoutpage">
      <div className = 'orderCheckout'>
        <h3 className="orangeOrder">Your Order</h3>
            {products.length > 0 &&
              products.map((val, key) => {
                totalPrice += val.price
                return <p><CheckoutDisplay name={val.name} price={val.price} /></p>
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
        {products.length > 0 &&
          products.map((val, key) => {
            totalPrice += val.price
            return <ProductDisplay name={val.name} price={val.price} />;
          })}
          {products.length===0 && <p>Cart is Empty</p>}
        <div className = 'checkoutcontainer'>
          <div className = 'price'>
            <h4>Total: ${parseFloat(totalPrice).toFixed(2)}</h4>
          </div>
          <div className='checkoutbutton'>
              <button type="button" onClick={() => setCheckout(!checkout)} class="btn btn-dark">
                Checkout
              </button>
          </div>
          </div>
        </div>
        </div></>
  )
};