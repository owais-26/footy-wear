import "@/styles/globals.css";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
 useEffect(() => {
   console.log("Hey, I'm useEffect from _app.js");
   try {
     const savedCart = localStorage.getItem("cart");
     if (savedCart) {
       setCart(JSON.parse(savedCart));
       saveCart(JSON.parse(savedCart));
     }
   } catch (error) {
     console.error(error);
     localStorage.clear();
   }
   
 }, []);

 const [cart, setCart] = useState({});
 const [total, setTotal] = useState(0);

 const saveCart = (myCart) => {
   localStorage.setItem("cart", JSON.stringify(myCart));
   let subt = 0;
   let keys = Object.keys(myCart);
   for (let i = 0; i < keys.length; i++) {
     subt += myCart[keys[i]].price * myCart[keys[i]].qty;
   }
   setTotal(subt);
   event.stopPropagation();
 };

 const addToCart = (itemCode, qty, price, name, size, variant) => {
   const newCart = { ...cart };
   if (itemCode in newCart) {
     newCart[itemCode].qty += qty;
   } else {
     newCart[itemCode] = { qty: 1, price, name, size, variant };
   }

   setCart(newCart);
   saveCart(newCart);
   event.stopPropagation();
 };

 const removeFromCart = (itemCode, qty, price, variant, name, size) => {
   const newCart = { ...cart };
   if (itemCode in newCart) {
     newCart[itemCode].qty -= qty;
     if (newCart[itemCode].qty <= 0) {
       delete newCart[itemCode];
     }
   }

   setCart(newCart);
   saveCart(newCart);
   event.stopPropagation();
 };

 const clearCart = () => {
   setCart({});
   saveCart({});
    event.stopPropagation();
 };

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        total={total}
        clearCart={clearCart}
      />{" "}
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        total={total}
        clearCart={clearCart}
        {...pageProps}
      />{" "}
      <Footer />
    </>
  );
}
