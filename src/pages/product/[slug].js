import { useRouter } from "next/router";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import mongoose from "mongoose";
import Product from "../../../models/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ clearCart, addToCart, product, variants }) => {
  console.log(product, variants);
  const router = useRouter();
  const [service, setService] = useState();
  const [pin, setPins] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { slug } = router.query;
  const checkService = async () => {
    const pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`);
    let pinJson = await pins.json();
    if (pinJson.includes(parseInt(pin))) {
      setService(true);
      toast.success("Your Pincode is servicable!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error("Sorry! Pincode not servicable!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const onChangePin = (e) => {
     const value = event.target.value;
     setPins(value);
     setIsButtonDisabled(value.length === 0);
  };
  const [color, setColor] = useState(product.color);
  const [Size, setSize] = useState(product.size);
  const refreshVariant = (newsize,newcolor) => {
    let url = `${variants[newcolor][newsize]["slug"]}`;
    window.location = url;
  };
  const buyNow =()=>{
    clearCart()
   addToCart(
     slug,
     1,
     product.price,
     product.title,
     product.size,
     product.color,
     product.img
   );
   router.push(`/checkout`)
    

  }
  const cartNotify = () =>
    toast.success("Item added to cart!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });;
  

  return (
    <>
      <ToastContainer
        position="top-center"
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

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full h-auto max-w-max md:h-auto lg:h-auto h-64 object-cover object-center rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                FOOTY WEAR
              </h2>

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title} {product.color}/{product.size}
              </h1>

              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex  items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={Size}
                      onChange={(e) => {
                        refreshVariant(e.target.value, color);
                      }}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 text-base pl-3 pr-10"
                    >
                      {Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>SM</option>
                      )}
                      {Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M</option>
                      )}
                      {Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L</option>
                      )}
                      {Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL</option>
                      )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  PKR {product.price}
                </span>

                <button
                  onClick={() => {
                    buyNow();
                  }}
                  className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded"
                >
                  Buy Now <BsCartPlus className="text-xl mt-0.5 ms-1" />
                </button>
                <button
                  onClick={() => {
                    cartNotify();
                    addToCart(
                      slug,
                      1,
                      product.price,
                      product.title,
                      product.size,
                      product.color,
                      product.img
                    );
                  }}
                  className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-3 focus:outline-none hover:bg-orange-600 rounded"
                >
                  Add to Cart <BsCartPlus className="text-xl mt-0.5 ms-1" />
                </button>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-orange-400">
                    <span>Pin code</span>
                  </label>
                  <input
                    onChange={onChangePin}
                    // type="number"

                    placeholder="Enter Valid Pin Code"
                    class="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      checkService();
                    }}
                    disabled={isButtonDisabled}
                    class="btn text-white hover:bg-orange-600 mt-4 p-2 px-3 border border-2 border-blue-800 rounded-lg bg-orange-500"
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  // Fetch data from external API

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};
  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  // Pass data to the page via props
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
}

export default Post;
