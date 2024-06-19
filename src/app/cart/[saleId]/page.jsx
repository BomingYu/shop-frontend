"use client";

import CartItemCard from "@/Components/Customer/CartItemCard";
import { useUserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { user } = useUserContext();
  const [sale, setSale] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserCartInThisCart = async () => {
      const response = await axios.get(
        `http://localhost:5006/api/sales/sale/withCart/${params.saleId}/${user.id}`
      );
      const saleRes = response.data;
      setSale(saleRes);
      setCartItems(saleRes.salesItems);
      setLoading(false);
    };
    getUserCartInThisCart();
  }, []);

  const testButton = () => {
    console.log(cartItems);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      {loading ? (
        <h1 className="text-5xl font-bold">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-1">
          {cartItems.map((item) => (
            <CartItemCard
              key={item.cartItems[0].id}
              name={item.product.name}
              price={item.price}
              unit={item.unit}
              quant={item.cartItems[0].quantity}
              subTotal={item.cartItems[0].total}
              imagePath={item.product.image}
            />
          ))}
          <button onClick={testButton}>Test</button>
        </div>
      )}
    </main>
  );
}
