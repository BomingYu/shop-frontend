"use client";

import UserOrderDetailCard from "@/Components/Customer/userOrder/userOrderDetailCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();
  const [orderItems , setOrderItems] = useState([]);

  useEffect(()=>{
    const getOrder = async() => {
        const response = await axios.get("http://localhost:5006/api/orders/orderItems/"+params.orderId);
        const order = response.data;
        setOrder(order);
        setOrderItems(order.orderItems);
        setLoading(false);
    }
    getOrder();
  },[]);

  const handleTestButton = () => {
    console.log(order);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      {loading ? (
        <h1 className="text-5xl font-bold">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-10">{params.orderId}</h1>
          <UserOrderDetailCard order={order}/>
          <div className="flex space-x-12">
            <Link className="bg-gray-700 p-1 rounded-full font-semibold text-gray-200" href="/myOrders">Back</Link>
            <button className="bg-red-500 dark:bg-red-700 p-1 rounded-full font-semibold dark:text-gray-100">Cancel Order</button>
          </div>
          <button onClick={(handleTestButton)}>Test</button>
        </div>
      )}
    </main>
  );
}
