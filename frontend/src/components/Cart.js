import React, { useState, useEffect } from "react";
import './Cart.css'

const ProductDisplay = () => (
  <section>
    <div className = 'checkoutPage'>
      <div className="product">
        <img
          src="https://i.imgur.com/EHyR2nP.png"
          alt="The cover of Stubborn Attachments"
          height="200px"

        />
        <div className="description">
        <h4>Stubborn Attachments</h4>
        <h6>$20.00</h6>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        <div className = 'checkoutbutton'>
      <button type="button" class="btn btn-dark">
          Checkout
        </button>
        </div>
      </form>
    </div>
  </section>
  
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}