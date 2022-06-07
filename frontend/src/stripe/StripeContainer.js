import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51L7mBYLWeOecFvXQvjxu5zhj8pq10XBNMM4JADufAC7C6V0fzWoNnc8paguROe12b5qArpFtHpCXE4TkTbI19A6l006FHtkbB5";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
      <><div>
              <Elements stripe={stripeTestPromise}>
                  <CheckoutForm />
              </Elements>
          </div></>
  );
};

export default Stripe;