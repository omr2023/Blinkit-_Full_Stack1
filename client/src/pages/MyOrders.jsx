import React from "react";
import { useSelector } from "react-redux";
import NoData from "../components/NoData";

const MyOrders = () => {
  const orders = useSelector((state) => state?.orders?.order);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders?.length === 0 ? (
        <NoData message="No orders found." />
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id + index}
            className="border rounded-lg shadow-md p-4 mb-5 bg-white transition duration-300 hover:shadow-lg"
          >
            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Order No:</span> {order.orderId}
            </p>

            <div className="flex items-center gap-5">
              <img
                src={order.product_details.image[0]}
                alt={order.product_details.name}
                className="w-16 h-16 object-cover rounded-md"
              />

              <div className="flex-1">
                <p className="text-lg font-semibold">
                  {order.product_details.name}
                </p>
                {order.product_details.price && (
                  <p className="text-green-600 font-bold mt-1">
                    ${order.product_details.price}
                  </p>
                )}
                {order.createdAt && (
                  <p className="text-gray-500 text-sm mt-1">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
