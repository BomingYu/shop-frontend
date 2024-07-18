"use client";

import AdminSalesItemCard from "@/Components/Admin/salesItemComponents/AdminSalesItemCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const [sale, setSale] = useState({});
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageState , setPageState] = useState(true);

  useEffect(() => {
    const getSaleById = async () => {
      const response = await axios.get(
        "http://localhost:5006/api/sales/" + params.saleId
      );
      const saleData = response.data;
      setSale(saleData);
      setItems(saleData.salesItems);
      setLoading(false);
    };
    getSaleById();
  }, [pageState]);

  const handleTestButton = () => {
    console.log(sale);
    console.log(items);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col items-center justify-center space-y-7 font-bodyFont">
        {loading ? (
          <h1 className="font-bodyFont text-5xl font-bold">Loading</h1>
        ) : (
          <h1 className="font-bodyFont text-5xl font-bold">{sale.name}</h1>
        )}
        <Link
          href={`/admin/sale/${params.saleId}/saleItems`}
          className="font-tagFont font-semibold bg-gray-700 dark:bg-gray-300 text-gray-200 dark:text-gray-800 p-2 rounded-full"
        >
          Add New Item
        </Link>

        {loading ? (
          <span>Loading...</span>
        ) : items.length === 0 ? (
          <span className="text-xl font-semibold">No Item Is Selling In This Sale</span>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-center">
            {items.map((item) => (
              <AdminSalesItemCard
                key={item.id}
                id={item.id}
                name={item.product.name}
                desc={item.description}
                price={item.price}
                unit={item.unit}
                imgPath={item.product.image}
                stateChange={()=>{setPageState(!pageState)}}
              />
            ))}
          </div>
        )}

        {loading ? (
          <span>Loading</span>
        ) : (
          <button onClick={handleTestButton}>Test Button</button>
        )}
      </div>
    </main>
  );
}
