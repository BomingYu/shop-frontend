"use client";

import Link from "next/link";
import { useUserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import CartSaleCard from "@/Components/Customer/CartSaleCard";

export default function Page() {
  const { user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartSale, setCartSale] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const objProps = Object.keys(user);
    setIsLoggedIn(objProps.length !== 0);
  }, [user]);

  useEffect(() => {
    const getUserCartSale = async () => {
      const response = await axios.get(
        `http://localhost:5006/api/cartItem/user/${user.id}/sales`
      );
      const cartSaleRes = response.data;
      setCartSale(cartSaleRes);
      setLoading(false);
    };
    getUserCartSale();
  }, [cartSale]);

  const testButton = async () => {
    console.log(cartSale);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col space-y-10 items-center font-tagFont">
        <h1 className="text-5xl font-bold">My Carts</h1>
        {!loading &&
          (cartSale.length == 0 ? (
            <div>
              <span>No item in your cart. </span>
              <Link
                className="dark:text-rose-800 text-rose-600 font-semibold underline"
                href="/"
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <span className="font-semibold">You have items in the following sales</span>
          ))}
        {!loading ? (
          isLoggedIn && <div className="flex flex-col space-y-1">
            {cartSale.map(item => (
              <CartSaleCard key={item.id} id={item.id} name={item.name} endAt={item.endAt}/>
            ))}
          </div>
        ) : (
          <h1 className="font-tagFont text-2xl font-bold">Loading...</h1>
        )}
      </div>
    </main>
  );
}
