import Image from "next/image";
import React from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";
import connectDb from "../../middleware/mongoose";
import Link from "next/link";

const Accessories = ({ products }) => {
  // console.log(products)
  return (
    <>
      <section className="text-gray-600 body-font content-center">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).length === 0 && (
              <p className="font-bold text-center text-lg">
                Sorry all accessories are currently out of stock. New stock is coming
                soon! Stay Tuned!
              </p>
            )}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div
                    style={{
                      width: "300px",
                      height: "500px",
                    }}
                    className=" w-full cursor-pointer shadow-lg mx-auto lg:mx-10"
                  >
                    <div className="block  relative rounded overflow-hidden">
                      <img
                        style={{
                          width: "300px",
                          height: "300px",
                        }}
                        // width={800}
                        // height={100}
                        alt="ecommerce"
                        // className="w-full h-full block"
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Accessories
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">PKR {products[item].price}</p>
                      <p className="mt-1">Available Sizes</p>
                      <div className="mt-1">
                        {products[item].size.includes("S") && (
                          <span className="border-2 me-1 border-orange-700 px-1">
                            S
                          </span>
                        )}
                        {products[item].size.includes("M") && (
                          <span className="border-2 me-1 border-orange-700 px-1">
                            M
                          </span>
                        )}
                        {products[item].size.includes("L") && (
                          <span className="border-2 me-1 border-orange-700 px-1">
                            L
                          </span>
                        )}
                        {products[item].size.includes("XL") && (
                          <span className="border-2 me-1 border-orange-700 px-1">
                            XL
                          </span>
                        )}
                        {products[item].size.includes("XLL") && (
                          <span className="border-2 me-1 border-orange-700 px-1">
                            XLL
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({ category: "accessories" });
  let accessories = {};
  for (let item of products) {
    if (item.title in accessories) {
      if (
        !accessories[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        accessories[item.title].color.push(item.color);
      }
      if (
        !accessories[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        accessories[item.title].size.push(item.size);
      }
    } else {
      accessories[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        accessories[item.title].color = [item.color];
        accessories[item.title].size = [item.size];
      }
    }
  }

  // Pass data to the page via props
  return { props: { products: JSON.parse(JSON.stringify(accessories)) } };
}
export default Accessories;
