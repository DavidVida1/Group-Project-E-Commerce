import { useState, useEffect, useContext } from "react";
import GlobalStyles from "./GlobalStyles";
import { CartContext } from "./CartContext";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Item from "./Item";
import Profile from "./Profile";
import Cart from "./Cart";
import Confirmation from "./Confirmation";
import Category from "./Category";

function App() {
  const userId = "JimmyBuyMore@realcustomer.ca";
  const {
    actions: { receiveCartInfoFromServer },
  } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  // need to lift the state here to make Category refresh items when header has been clicked
  const [bodyLocation, setBodyLocation] = useState(null);

  useEffect(() => {
    fetch(`/api/get-cart/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          receiveCartInfoFromServer(data.data);
        }
        else if (data.status === 404) {
          
        } else {
          window.alert(data.message);
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        window.alert(error);
    })
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyles />
        <Header setBodyLocation={setBodyLocation}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item/:itemId" element={<Item userId={userId} />} />
          <Route path="/category/:category" element={<Category  bodyLocation={bodyLocation} setBodyLocation={setBodyLocation} />}/>
          <Route path="/company-profile/:companyId" element={<Profile />} />
          <Route path="/cart" element={<Cart userId={userId} setOrderId={setOrderId}/>} />
          <Route path="/confirmation" element={<Confirmation orderId={orderId}/>} />
          <Route path="*" element={<h1>404: Oops!</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
