import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import './CheckoutForm.css'

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

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
          const response = await axios.post(
            "http://localhost:8080/stripe/charge",
            {
              amount: 999,
              id: id,
            }
          );
  
          console.log("Stripe 35 | data", response.data.success);
          if (response.data.success) {
            console.log("CheckoutForm.js 25 | payment successful!");
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error);
        }
      } else {
        console.log(error.message);
      }
    };
  return (
    <><div>
          <h1 className='checkoutHeader'>Checkout</h1>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
              <CardElement />
              <div className = 'payment'>
              <button type="button" class="btn btn-dark">Pay</button>
              </div>
          </form>
          </>
  );
};