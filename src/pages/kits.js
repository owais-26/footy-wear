import Image from "next/image";
import React from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";
import connectDb from "../../middleware/mongoose";
import Link from "next/link";

const kits = ({ products }) => {
  // console.log(products)
  return (
    <>
      <section className="text-gray-600 body-font content-center">
        <div className="container px-5 py-24 mx-auto ">
          <div className="flex flex-wrap -m-4 justify-center">
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
                    <div className="block relative rounded overflow-hidden">
                      <img
                        style={{
                          width: "300px",
                          height: "300px",
                        }}
                        alt="ecommerce"
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Kits
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
  let products = await Product.find({category: 'kits'});
  let kits = {};
  for (let item of products) {
    if (item.title in kits) {
      if (
        !kits[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        kits[item.title].color.push(item.color);
      }
      if (!kits[item.title].size.includes(item.size) && item.availableQty > 0) {
        kits[item.title].size.push(item.size);
      }
    } else {
      kits[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        kits[item.title].color = [item.color];
        kits[item.title].size = [item.size];
      }
    }
  }
  

  // Pass data to the page via props
  return { props: { products: JSON.parse(JSON.stringify(kits)) } };
}
export default kits;
