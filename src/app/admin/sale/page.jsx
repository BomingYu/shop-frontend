"use client";

import AdminSaleCard from "@/Components/Admin/saleComponents/AdminSaleCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageState , setPageState] = useState(true);

  useEffect(() => {
    const getAllSale = async () => {
      const response = await axios.get("http://localhost:5006/api/sales");
      const salesData = response.data;
      setSales(salesData);
      setLoading(false);
    };
    getAllSale();
  }, [pageState]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col space-y-10 items-center ">
        <h1 className="font-tagFont text-5xl font-bold">Sales</h1>
        <Link href="/admin/sale/newSale" className="font-bodyFont font-bold text-xl bg-slate-700 text-gray-200 p-2 rounded-full">New Sale</Link>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          sales.map((sale) => (
            <AdminSaleCard
              key={sale.id}
              saleId={sale.id}
              name={sale.name}
              available={sale.isAvailable}
              //startAt={sale.startAt}
              endAt={sale.endAt}
              stateChange={()=>{setPageState(!pageState)}}
            />
          ))
        )}
        <button onClick={()=>{console.log(sales)}}>Test</button>
      </div>
    </main>
  );
}
