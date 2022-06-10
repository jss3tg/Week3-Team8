import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SellerDashboard from './components/SellerDashboard'
import StripeContainer from './stripe/StripeContainer'
import Prod from "./components/Prod";

export default function Links() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="productpage" element={<Prod />} />
      <Route path="sellDash" element={<SellerDashboard />} />
      <Route path="cart" element={<StripeContainer />} />
    </Routes>
  );
}