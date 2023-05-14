import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { BsCart4, BsCash, BsFileMinusFill, BsPlusCircle } from "react-icons/bs";

import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import {
  AiFillPlusCircle,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineMinusCircle,
  AiOutlineShoppingCart,
  IconName,
} from "react-icons/ai";

const Checkout = ({ cart, addToCart, removeFromCart, total, clearCart }) => {
  return (
    <>
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
          Check Out
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
          <div className="flex flex-col md:w-full">
            <h2 className="mb-4 font-bold md:text-xl text-heading ">
              Shipping Address
            </h2>
            <form
              className="justify-center w-full mx-auto"
              method="post"
              action
            >
              <div className="">
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      for="firstName"
                      className="block mb-3 text-sm font-semibold text-orange-700"
                    >
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      for="firstName"
                      className="block mb-3 text-sm font-semibold text-orange-700"
                    >
                      Last Name
                    </label>
                    <input
                      name="Last Name"
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      for="Email"
                      className="block mb-3 text-sm font-semibold text-orange-700"
                    >
                      Email
                    </label>
                    <input
                      name="Last Name"
                      type="text"
                      placeholder="Email"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full">
                    <label
                      for="Address"
                      className="block mb-3 text-sm font-semibold text-orange-700"
                    >
                      Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      name="Address"
                      cols="20"
                      rows="4"
                      placeholder="Address"
                    ></textarea>
                  </div>
                </div>
                <div className="space-x-0 lg:flex lg:space-x-4">
                  <div className="w-full lg:w-1/2">
                    <label
                      for="city"
                      className="block mb-3 text-sm font-semibold text-orange-700"
                    >
                      City
                    </label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 ">
                    <label
                      for="postcode"
                      className="block mb-3 text-sm font-semibold text-orange-700"
                    >
                      Postcode
                    </label>
                    <input
                      name="postcode"
                      type="text"
                      placeholder="Post Code"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <label className="flex items-center text-sm group text-heading">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-300 rounded focus:outline-none  focus:ring-1"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>
                <div className="relative pt-3 xl:pt-6">
                  <label
                    for="note"
                    className="block mb-3 text-sm font-semibold text-orange-700"
                  >
                    {" "}
                    Notes (Optional)
                  </label>
                  <textarea
                    name="note"
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                    rows="4"
                    placeholder="Notes for delivery"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900">
                    Process
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex mt-10   flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
            <div className="flex cartCheckout h-full flex-col overflow-y-scroll  bg-white shadow-xl">
              <div className="flex-1  overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    className="text-lg font-medium shop "
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                  <div className="ml-3 flex h-7 items-center"></div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
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
                <div className="flex mb-5 justify-between text-base font-semibold text-gray-900">
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
                    <Link href={"/"}>
                      <div className="flex-1 block w-full rounded-md border border-transparent bg-indigo-600 me-3 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                        <span className="flex">
                          {" "}
                          <BsCash className="mt-0.5 me-1 text-xl" />{" "}
                          Pay Now 
                        </span>
                      </div>
                    </Link>
                  </button>

                  <button onClick={clearCart}>
                    <div className="flex-1 block w-full rounded-md border border-transparent bg-indigo-600 mx-2 px-2 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
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
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <Link href={'/'}   >Continue Shopping</Link>
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
