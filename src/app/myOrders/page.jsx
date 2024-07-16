"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/Contexts/UserContext";
import axios from "axios";
import UserOrderCard from "@/Components/Customer/userOrder/userOrderCard";

export default function Page() {
  const { user } = useUserContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyOrders = async () => {
      const response = await axios.get(
        "http://localhost:5006/api/orders/" + user.id
      );
      const ordersRes = response.data;
      setOrders(ordersRes);
      setLoading(false);
    };
    getMyOrders();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-3">My Orders</h1>
        {loading ? (
          <h1 className="text-3xl font-bold">Loading...</h1>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            {orders.map(order=>(
                <UserOrderCard key={order.id} id={order.id} location={order.pickLocation} status={order.status} total={order.total} saleStatus={order.sale.status}/>
            ))}
          </div>
        )}
        <button onClick={()=>{console.log(orders)}}>Test</button>
      </div>
    </main>
  );
}
