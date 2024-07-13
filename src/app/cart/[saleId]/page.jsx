"use client";

import CartItemCard from "@/Components/Customer/CartItemCard";
import { useUserContext } from "@/Contexts/UserContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { user } = useUserContext();
  const [sale, setSale] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const router = useRouter();

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
  }, [status]);

  const handleOrderButton = () => {
    console.log(sale);
    console.log(cartItems);
    router.push(`/order/${params.saleId}`);
  };

  const calculateTotal = () => {
    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      sum += cartItems[i].cartItems[0].total;
    }
    return sum;
  };

  const countItems = () => {
    let count = 0;
    for(let i=0 ; i<cartItems.length ; i++){
      count += cartItems[i].cartItems[0].quantity;
    }
    return count;
  }

  const handleTest = () => {
    console.log(cartItems);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
      {loading ? (
        <h1 className="text-5xl font-bold">Loading...</h1>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3 w-[360px]">
          <h1 className="text-4xl font-bold">{sale.name}</h1>
          {cartItems.length !== 0 ? (
            <span className="mx-3">
              You have a total of <span className="font-bold text-xl">{countItems()}</span> items, consisting of <span className="font-bold text-xl">{cartItems.length}</span> different products in this sale.
            </span>
          ) : (
            <span>
              You have no item in this sale,{" "}
              <Link
                className="dark:text-rose-800 text-rose-600 font-semibold underline"
                href="/"
              >
                START SHOPPING
              </Link>
              .
            </span>
          )}
          {cartItems.length !== 0 && (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={handleOrderButton}
                className="p-2 mx-3 text-lg font-semibold rounded-full text-gray-100 bg-lime-950"
              >
                Proceed to Checkout
              </button>
              <span className="text-right px-3 font-semibold text-lg mx-3">
                Total :{" "}
                <span className="text-xl font-bold underline decoration-double underline-offset-4">
                  ${calculateTotal()}
                </span>
              </span>
            </div>
          )}
          {cartItems.map((item) => (
            <CartItemCard
              key={item.cartItems[0].id}
              id={item.cartItems[0].id}
              name={item.product.name}
              price={item.price}
              unit={item.unit}
              quant={item.cartItems[0].quantity}
              subTotal={item.cartItems[0].total}
              imagePath={item.product.image}
              handleRefresh={() => setStatus(!status)}
            />
          ))}
          <button onClick={handleTest}>Test</button>
        </div>
      )}
    </main>
  );
}
