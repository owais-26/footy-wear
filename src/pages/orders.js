import mongoose from "mongoose";
import React from "react";
import Order from "/models/Order";
const Orders = () => {
  return (
    <>
      <div className="container mx-auto color">
        <div class="flex flex-col color m-auto ">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8 m-auto">
              <div class="overflow-hidden">
                <h1 className="text-3xl color font-bold text-center py-3">
                  My Orders
                </h1>
                <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" class="px-6 py-4">
                        #
                      </th>
                      <th scope="col" class="px-6 py-4">
                        First
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Last
                      </th>
                      <th scope="col" class="px-6 py-4">
                        Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                      <td class="whitespace-nowrap px-6 py-4">Mark</td>
                      <td class="whitespace-nowrap px-6 py-4">Otto</td>
                      <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                      <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                      <td class="whitespace-nowrap px-6 py-4">Thornton</td>
                      <td class="whitespace-nowrap px-6 py-4">@fat</td>
                    </tr>
                    <tr class="border-b dark:border-neutral-500">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                      <td class="whitespace-nowrap px-6 py-4">Larry</td>
                      <td class="whitespace-nowrap px-6 py-4">Wild</td>
                      <td class="whitespace-nowrap px-6 py-4">@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export async function getServerSideProps(context) {
  // Fetch data from external API

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let orders = await Order.find({});

  // Pass data to the page via props
  return {
    props: {
      orders: orders,
    },
  };
}

export default Orders;
