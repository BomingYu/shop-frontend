"use client";

import UserOrderDetailCard from "@/Components/Customer/userOrder/userOrderDetailCard";
import axios, { Axios } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);
  const [refresh , setRefresh] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getOrder = async () => {
      const response = await axios.get(
        "http://localhost:5006/api/orders/orderItems/" + params.orderId
      );
      const order = response.data;
      setOrder(order);
      setOrderItems(order.orderItems);
      setLoading(false);
    };
    getOrder();
  }, []);

  const handleCancelOrder = async () => {
    console.log(order.id);
    const cancelledOrder = {
      status: "Cancelled",
    };
    try {
      const response = await axios.put(
        `http://localhost:5006/api/orders/${order.id}/cancel`,
        cancelledOrder,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("This order has been cancelled.");
      //setRefresh(!refresh);
      //router.refresh();
      window.location.reload();
    } catch (error) {
      console.error("Failed to cancel order:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      {loading ? (
        <h1 className="text-5xl font-bold">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-10">{params.orderId}</h1>
          <UserOrderDetailCard order={order} />
          <div className="flex space-x-12 mt-5">
            <Link
              className="bg-gray-700 p-1 rounded-full font-semibold text-gray-200"
              href="/myOrders"
            >
              Back
            </Link>
            {order.status !== "Cancelled" && order.status !== "Expired" && order.status !== "Pickedup" && (
              <button
                className="bg-red-500 dark:bg-red-700 p-1 rounded-full font-semibold dark:text-gray-100"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
