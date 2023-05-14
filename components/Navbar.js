import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { BsCart4, BsFileMinusFill, BsPlusCircle } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";

import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import {
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinusCircle,
  AiOutlineShoppingCart,
  IconName,
} from "react-icons/ai";
 
const Navbar = ({ cart, addToCart, removeFromCart, total, clearCart }) => {
    console.log(cart, addToCart, removeFromCart, total, clearCart);
  const [Side, setSide] = useState(false);
  const togglerRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        togglerRef.current &&
        !togglerRef.current.contains(event.target) &&
        Side
      ) {
        setSide(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [togglerRef, Side]);
  
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap  flex-col md:flex-row items-center">
          <Link href={"/"} legacyBehavior>
            <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <Image
                src={"/NavLogo.png"}
                className="Logo"
                alt="Logo"
                width={80}
                height={40}
              />
            </a>
          </Link>

          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/footballs"} legacyBehavior>
              <a className="mr-5 hover:text-gray-900 text-lg font-bold">
                Footballs
              </a>
            </Link>
            <Link href={"/kits"} legacyBehavior>
              <a className="mr-5 hover:text-gray-900 text-lg  font-bold">
                Kits
              </a>
            </Link>
            <Link href={"/shoes"} legacyBehavior>
              <a className="mr-5 hover:text-gray-900 text-lg  font-bold">
                Shoes
              </a>
            </Link>
            <Link href={"/hoodies"} legacyBehavior>
              <a className="mr-5 hover:text-gray-900 text-lg  font-bold">
                Hoodies
              </a>
            </Link>
          </nav>
          <Link href={"/login"}>
            <button
              ref={togglerRef}
              className="inline-flex mb-0.5 items-center border-2 border-black bg-gray-100 border-0 py-1 px-3  focus:outline-none hover:bg-orange-200  text-base mt-4 md:mt-0"
            >
              <MdOutlineAccountCircle className="text-2xl text-black" />
            </button>
          </Link>

          <button
            ref={togglerRef}
            onClick={() => {
              setSide(true);
            }}
            className="inline-flex border-2 border-black items-center mb-0.5  bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200  text-base mt-4 md:mt-0"
          >
            <BsCart4 className="text-2xl  text-black" />
          </button>
          {Side && (
            <>
              <div
                className="relative z-10  "
                aria-labelledby="slide-over-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75  transition-opacity  "></div>

                <div className="fixed inset-0 overflow-hidden ">
                  <div className="absolute inset-0 overflow-hidden ">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 ">
                      <div className="pointer-events-auto w-screen max-w-md ">
                        <div
                          onClick={() => {
                            event.stopPropagation();
                          }}
                          className="flex cartCheckout h-full flex-col overflow-y-scroll  bg-white shadow-xl"
                        >
                          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <h2
                                className="text-lg font-medium shop "
                                id="slide-over-title"
                              >
                                Shopping cart
                              </h2>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  onClick={() => {
                                    setSide(false);
                                  }}
                                  type="button"
                                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                >
                                  <span className="sr-only">Close panel</span>
                                  <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            <div className="mt-8">
                              <div className="flow-root">
                                <ul
                                  role="list"
                                  className="-my-6 divide-y divide-gray-200"
                                >
                                  {Object.keys(cart).length === 0 && (
                                    <div className="font-semibold">
                                      No item in the cart!
                                    </div>
                                  )}
                                  {Object.keys(cart).map((k) => {
                                    return (
                                      <li className="flex py-6" key={k}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <img
                                            src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
                                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                            className="h-full w-full object-cover object-center"
                                          />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                              <span className="text-orange-600">
                                                {cart[k].name}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500 pb-2 ">
                                              <span className="pb-2">
                                                Qty {cart[k].qty}
                                              </span>
                                              <button
                                                onClick={() => {
                                                  addToCart(
                                                    k,
                                                    1,
                                                    cart[k].price,
                                                    cart[k].name,
                                                    cart[k].size,
                                                    cart[k].variant
                                                  );
                                                }}
                                                className="ms-2"
                                              >
                                                {" "}
                                                <FaPlusCircle className="text-md" />
                                              </button>{" "}
                                              <button
                                                onClick={() => {
                                                  removeFromCart(
                                                    k,
                                                    1,
                                                    cart[k].price,
                                                    cart[k].name,
                                                    cart[k].size,
                                                    cart[k].variant
                                                  );
                                                }}
                                                className="mx-2"
                                              >
                                                {" "}
                                                <FaMinusCircle className="text-md" />{" "}
                                              </button>
                                            </p>

                                            <div className="flex"></div>
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flex mb-5 justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>$ {total}</p>
                            </div>
                            <p className="mt-0.5 mb-3 text-sm text-gray-500">
                              Shipping and taxes calculated at checkout.
                            </p>
                            <div className="flex space-x-4 ">
                              <button
                                onClick={() => {
                                  setSide(false);
                                }}
                              >
                                <Link href={"/checkout"}>
                                  <div className="flex-1 block w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                    <span className="flex">
                                      {" "}
                                      <AiOutlineShoppingCart className="mt-0.5 me-1 text-xl" />{" "}
                                      Checkout
                                    </span>
                                  </div>
                                </Link>
                              </button>

                              <button onClick={clearCart}>
                                <div className="flex-1 block w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                  <span className="flex">
                                    {" "}
                                    <AiOutlineDelete className="mt-0.5 me-1 text-xl" />{" "}
                                    Clear Cart
                                  </span>
                                </div>
                              </button>
                            </div>

                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                              <p>
                                or &nbsp;
                                <button
                                  onClick={() => {
                                    setSide(false);
                                  }}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Continue Shopping
                                  <span aria-hidden="true"> &rarr;</span>
                                </button>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
