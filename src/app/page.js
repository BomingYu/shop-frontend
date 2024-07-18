"use client";

import Image from "next/image";
import { useUserContext } from "@/Contexts/UserContext";
import LoginComponent from "@/Components/LoginComponent";
import AdminProductCard from "@/Components/Admin/AdminProductCard";
import CustomerSaleCard from "@/Components/Customer/CustomerSaleCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const { user } = useUserContext();
  const [validSales , setValidSales] = useState([]);
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
    const getValidSales = async() => {
      const response = await axios.get("http://localhost:5006/api/sales/validSales");
      const resData = response.data;
      setValidSales(resData);
      setLoading(false);
    }
    getValidSales();
  },[])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="font-bodyFont flex flex-col items-center justify-center space-y-3">
        <h1 className="font-bodyFont text-5xl font-bold mb-3">
          Current Sales
        </h1>
        {loading ? (<h1 className="font-bodyFont text-3xl font-bold mb-3">
          Loading...
        </h1>) : (
        <div className="flex flex-col space-y-1">
          {validSales.map(sale=>(<CustomerSaleCard key={sale.id} id={sale.id} name={sale.name} end={sale.endAt} status={sale.status}/>))}
        </div>
        )}
      </div>
    </main>
  );
}