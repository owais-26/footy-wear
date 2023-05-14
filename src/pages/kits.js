import Image from "next/image";
import React from "react";

const kits = () => {
  return (
    <>
      <section className="text-gray-600 body-font content-center">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative  rounded overflow-hidden">
                <Image
                  width={400}
                  height={250}
                  alt="ecommerce"
                  className="w-full h-full block"
                  src={"/Shirt.jpg"}
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  CATEGORY
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  The Catalyzer
                </h2>
                <p className="mt-1">$16.00</p>
              </div>
            </div>
       
          </div>
        </div>
      </section>
    </>
  );
};

export default kits;
