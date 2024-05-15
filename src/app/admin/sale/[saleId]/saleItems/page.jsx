"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductSelectForSale from "@/Components/Admin/salesItemComponents/ProductSelectForSale";
import axios from "axios";
import Link from "next/link";

export default function Page({ params }) {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProduct = async () => {
      const response = await axios.get("http://localhost:5006/api/products");
      const resData = response.data;
      setProducts(resData);
      setLoading(false);
    };
    getAllProduct();
  }, []);

  const handleChangeProductId = (productId) => {
    router.push(`/admin/sale/${params.saleId}/${productId}`);
    console.log(productId);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col items-center justify-center space-y-5 font-bodyFont">
        <h1 className="font-bodyFont text-5xl font-bold">
          Select a Product for Sale
        </h1>
        <Link
          href={`/admin/sale/${params.saleId}`}
          className="bg-gray-700 text-lg font-bold p-2 text-white rounded-full w-20 text-center"
        >
          Cancel
        </Link>
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center justify-center">
            {products.map((p) => (
              <ProductSelectForSale
                key={p.id}
                name={p.name}
                desc={p.description}
                imgPath={p.image}
                onHandleSelect={() => handleChangeProductId(p.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
