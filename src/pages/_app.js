import "@/styles/globals.css";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";




export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState({value: null})
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const router= useRouter()
 useEffect(() => {
  //  console.log("Hey, I'm useEffect from _app.js");
  router.events.on('routeChangeStart', ()=>{
    setProgress(40)
  })
  router.events.on('routeChangeComplete', ()=>{
    setProgress(100)
  })
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
   const token = localStorage.getItem('token')
   if(token){
    setUser({value : token})
    setKey(Math.random())
   }
 }, [router.query]);

 
const logout = ()=>{
  localStorage.removeItem("token")
  setUser({value: null})
  setKey(Math.random())
 
}
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
 
const ref = useRef(null);
  return (
    <>
      <LoadingBar
        color="#F94616"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
      />
      <Navbar
        logout={logout}
        key={key}
        user={user}
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
