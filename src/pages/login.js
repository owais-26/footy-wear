import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
    
  }, []);
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    firstName: "a",
    lastName: "a",
    email: "a",
    number: "a",
    subject: "a",
    inquiry: "a",
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await res.json();
    console.log(response);

    if (response.success) {
      console.log("Data added successfully:", response.message);
    } else {
      console.log("Failed to add data:", response.message);
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

    return (
      <>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto  w-auto"
              src="NavLogo.png"
              alt="Your Company"
            />
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-orange-700">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm  font-medium leading-6 text-orange-700"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-orange-700"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      href={"/forgot"}
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link
                href={"/signup"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Register Now!
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  };
export default Login;
