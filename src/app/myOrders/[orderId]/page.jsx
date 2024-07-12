"use client";

import axios from "axios";
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
    console.log(orderItems);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      {loading ? (
        <h1 className="text-5xl font-bold">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold">{params.orderId}</h1>
          <button onClick={(handleTestButton)}>Test</button>
        </div>
      )}
    </main>
  );
}
