"use client";

import SaleItemCard from "@/Components/Customer/SaleItemCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [sale, setSale] = useState({});
  const [saleItems, setSaleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [userCart, setUserCart] = useState([]);

  const userId = "2a2df2b0-5fa1-4518-991d-572a8aa58916";

  useEffect(() => {
    const getSaleById = async () => {
      const response = await axios.get(
        "http://localhost:5006/api/sales/" + params.saleId
      );
      const resSale = response.data;
      const resSaleItems = resSale.salesItems;
      setSale(resSale);
      setSaleItems(resSaleItems);
      setLoading(false);
    };
    const getUserCart = async () => {
      const response = await axios.get(
        "http://localhost:5006/api/cartItem/user/"+userId
      );
      const resUserCart = response.data;
      setUserCart(resUserCart)
    };
    getSaleById();
    getUserCart();
  }, []);

  const testButton = () => {
    console.log(userCart);
  }

  const checkEndAt = (date) => {
    if (date == "" || date == null) {
      return false;
    } else {
      return true;
    }
  };
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
            saleItems.map((item) => (
              <SaleItemCard
                name={item.product.name}
                price={item.price}
                unit={item.unit}
                desc={item.description}
                imagePath={item.product.image}
              />
            ))
          )}
        </div>
        <button onClick={testButton}>Test</button>
      </div>
    </main>
  );
}
