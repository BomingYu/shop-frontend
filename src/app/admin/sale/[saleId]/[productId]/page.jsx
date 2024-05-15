"use client";

import SingleProductCard from "@/Components/Admin/salesItemComponents/SingleProductCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import WarningComponent from "@/Components/Sundries/WarningComponent";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [desc, setDesc] = useState("");

  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getTheProduct = async () => {
      const response = await axios.get(
        "http://localhost:5006/api/products/" + params.productId
      );
      const resData = response.data;
      setProduct(resData);
      setLoading(false);
    };
    getTheProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (price !== "" && unit !== "") {
      if (!isNaN(price) && isFinite(price)) {
        const formData = {
          price: price,
          unit: unit,
          description: desc,
          productId: params.productId,
          saleId: params.saleId,
        };
        console.log(formData);
        await axios.post(
          "http://localhost:5006/api/salesitems",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        router.push("/admin/sale/"+params.saleId);
      } else {
        setError("Invalide entered price type");
        setShowError(true);
      }
    } else {
      setError("Price or Unit cannot br empty");
      setShowError(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col items-center justify-center space-y-5 font-bodyFont">
        <h1 className="font-bodyFont text-5xl font-bold">New Product</h1>
        {showError && (
          <WarningComponent
            info={error}
            close={() => {
              setShowError(false);
              setPrice("");
            }}
          />
        )}
        <div className="flex items-center justify-center space-x-6">
          <div className="flex flex-col space-y-2">
            <SingleProductCard name={product.name} imgPath={product.image} />
            <Link
              href={`/admin/sale/${params.saleId}/saleItems`}
              className="bg-gray-800 text-gray-200 p-1 rounded-full text-sm"
            >
              Change Product
            </Link>
          </div>
          <form
            action=""
            className="flex flex-col space-y-3 items-center justify-center"
            onSubmit={handleSubmit}
          >
            <div className="flex space-x-2 font-tagFont items-center">
              <span className="font-semibold w-32 text-right">Price</span>
              <input
                type="text"
                className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="flex space-x-2 font-tagFont items-center">
              <span className="font-semibold w-32 text-right">Unit</span>
              <input
                type="text"
                className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              />
            </div>
            <div className="flex space-x-2 font-tagFont items-center">
              <span className="font-semibold w-32 text-right">Description</span>
              <textarea
                type="text"
                className="dark:text-black rounded-xl w-48 p-1 h-24 text-md"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="flex items-center justify-center space-x-10">
              <button className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 w-20 text-lg font-bold p-2 rounded-full">
                Add
              </button>
              <Link
                href={`/admin/sale/${params.saleId}`}
                className="bg-gray-700 text-lg font-bold p-2 text-white rounded-full w-20 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
