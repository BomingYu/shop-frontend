"use client";

import SaleItemCard from "@/Components/Customer/SaleItemCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "@/Contexts/UserContext";

export default function Page({ params }) {
  const [sale, setSale] = useState({});
  const [saleItems, setSaleItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    const objProps = Object.keys(user);
    setIsLoggedIn(objProps.length !== 0);
  }, [user]);

  useEffect(() => {
    const getCartByUser = async () => {
      const responseCart = await axios.get(
        "http://localhost:5006/api/cartItem/user/" + user.id
      );
      console.log("true");
      const resCartItems = responseCart.data;
      setCartItems(resCartItems);
    };
    getCartByUser();
  }, []);

  useEffect(() => {
    const getSaleAndCart = async () => {
      const responseSale = await axios.get(
        "http://localhost:5006/api/sales/" + params.saleId
      );
      const resSale = responseSale.data;
      const resSaleItems = resSale.salesItems;
      setSale(resSale);
      setSaleItems(resSaleItems);
      setLoading(false);
    };
    getSaleAndCart();
  }, []);

  const testButton = () => {
    console.log(cartItems);
  };

  const checkEndAt = (date) => {
    if (date == "" || date == null) {
      return false;
    } else {
      return true;
    }
  };

  const checkQuantity = () => {};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col items-center font-bodyFont space-y-3">
        {loading ? (
          <h1 className="font-bodyFont text-5xl font-bold mb-3">Loading...</h1>
        ) : (
          <h1 className="font-bodyFont text-5xl font-bold mb-3">{sale.name}</h1>
        )}
        {loading ? (
          <h1 className="font-bodyFont text-5xl font-bold mb-3">Loading...</h1>
        ) : (
          <div>
            <span>This Sale Available From</span> <span>{sale.startAt}</span>{" "}
            {checkEndAt(sale.endAt) && <span>To</span>}{" "}
            {checkEndAt(sale.endAt) ? (
              <span>{sale.endAt}</span>
            ) : (
              <span>and Available Indefinitely.</span>
            )}{" "}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center">
          {loading ? (
            <h1 className="font-bodyFont text-5xl font-bold mb-3">
              Loading...
            </h1>
          ) : (
            saleItems.map((item) => {
              const existInCart = cartItems.some(
                (ci) => ci.salesItemId === item.id
              );

              console.log("Result ", item.id, existInCart);

              const cartItem = cartItems.find((ci) => ci.salesItemId === item.id);

              const cartQuant = cartItem ? cartItem.quantity : 0;

              console.log(cartQuant);

              return (
                <SaleItemCard
                  key={item.id}
                  name={item.product.name}
                  price={item.price}
                  quantity={cartQuant}
                  unit={item.unit}
                  desc={item.description}
                  imagePath={item.product.image}
                  isInCart={existInCart}
                />
              );
            })
          )}
        </div>
        <button onClick={testButton}>Test</button>
      </div>
    </main>
  );
}
