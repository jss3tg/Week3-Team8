import Button from "react-bootstrap/Button";
import React, { useEffect, useState, useContext } from "react";
import "./prod.css";
import StripeContainer from "../stripe/StripeContainer";
import axios from "axios";
import {UserIDContext} from "../UserIDContext";
const Prod = () => {
  const [products, setProducts] = useState([]);
  const {curUserID} = useContext(UserIDContext);
  useEffect(() => {
    fetch("http://localhost:9000/products/info")
      .then((res) => res.json())
      .then((data) => setProducts(data.result));
  }, []);
  console.log({ products });
  const ProductDisplay = (props) => (
    <section>
      <div className="checkoutPage">
        <div className="product">
          <img
            src={props.image}
            alt="The cover of Stubborn Attachments"
            height="150"
            width="150px"
          />
          <div className="description">
            <h5>{props.name}</h5>
            <h6>Condition: {props.condition}</h6>
            <h6>${props.price}</h6>
            <h6>Negotiable: {props.negotiable}</h6>
          </div>
        </div>
      </div>
    </section>
  );
  const ProductDisplay1 = (props) => (
    <section>
      <div className="checkoutPage">
        <div className="product">
          <div className="description">
            <h6>{props.description}</h6>
            <h6>Number Available: {props.numberAvailable}</h6>
            <h6>Pickup Location: {props.pickupLocation} </h6>
          </div>
        </div>
      </div>
    </section>
  );
  return (
    <div>
    <h1 className = "title">All Products</h1>
    <div className="container">
      {products.length > 0 &&
        products.map((val, key) => {
          return (
            <>
              <div className="product-display">
                <ProductDisplay
                  name={val.name}
                  condition={val.condition}
                  price={val.price}
                  negotiable={val.negotiable}
                  image={val.image}
                />{" "}
                <div className="button-display">
                  <a class="button is-secondary" href="cart" target="_blank">
                    <Button variant="secondary" onClick ={ () => {axios.put("http://localhost:9000/cart/addToCart/" + curUserID + "/" + val.id)}} >
                      Add to Cart
                    </Button>
                  </a>
                  <div>
                    <p>
                      <details>
                        <div>
                          <p>
                            <ProductDisplay1
                              description={val.description}
                              numberAvailable={val.numberAvailable}
                              pickupLocation={val.pickupLocation}
                            />{" "}
                          </p>
                        </div>
                      </details>
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </div>
    </div>
  );
};
export default Prod;