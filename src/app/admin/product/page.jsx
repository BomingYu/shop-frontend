"use client";

import AdminProductCard from "@/Components/Admin/AdminProductCard";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProduct = async () => {
      const response = await axios.get("http://localhost:5006/api/products");
      const responseData = response.data;
      setProducts(responseData);
      setLoading(false);
    };
    getAllProduct();
  }, [products]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col items-center space-y-5">
        <h1 className="font-tagFont text-5xl font-bold">Product Management</h1>
        <Link
          href="product/newProduct"
          className="font-tagFont font-semibold bg-gray-700 dark:bg-gray-300 text-gray-200 dark:text-gray-800 p-2 rounded-full"
        >
          Add New Product
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center">
        {loading ? (
          <h1>Loading</h1>
        ) : (
          products.map((product) => (
            <AdminProductCard
              key={product.id}
              id={product.id}
              imagePath={product.image}
              name={product.name}
              description={product.description}
            />
          ))
        )}
        </div>
      </div>
    </main>
  );
}
