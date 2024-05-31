"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useUserContext } from "@/Contexts/UserContext";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SaleItemCard({
  id,
  cartId,
  name,
  price,
  unit,
  quantity,
  desc,
  imagePath,
  isInCart,
  stateChanging,
}) {
  const [imgError, setImageError] = useState(false);
  const [quant, setQuant] = useState(quantity);
  const { user } = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const objProps = Object.keys(user);
    setIsLoggedIn(objProps.length !== 0);
  }, [user]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleMinus = () => {
    if (quant > 0) {
      setQuant(quant - 1);
    }
  };

  const handlePlus = () => {
    if (quant < 999) {
      setQuant(quant + 1);
    }
  };

  const handleAddNewToCart = async () => {
    const formData = {
      price: price,
      quantity: quant,
      total: quant * price,
      appUserId: user.id,
      salesItemId: id,
    };
    const response = await axios.post(
      "http://localhost:5006/api/cartItem",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(response.data);
    stateChanging();
  };

  const handleDelete = async() => {
    const response  = await axios.delete("http://localhost:5006/api/cartItem/"+cartId);
    console.log(response.data);
    setQuant(0);
    stateChanging();
  }

  const handleUpdate = () => {
    console.log(cartId);
    console.log(quant);
    console.log(price);
    console.log(price * quant);
  }

  return (
    <div className="w-64 h-72 flex flex-col items-center justify-center border m-1 rounded-lg">
      <div className="flex flex-col items-center justify-center space-y-1 w-[180px] h-[200px]">
        <div className="image-container">
          <Image
            //src={imgError ? "/icons/NotFound.jpg" : imagePath}
            src={imgError ? "/icons/NotFound.jpg" : imagePath || "/icons/NotFound.jpg"}
            alt={name}
            width={90}
            height={90}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <h1 className="font-semibold">{name}</h1>
        <div>
          <span>{price}</span> <span>/</span> <span>{unit}</span>
        </div>
        <div className="flex w-full">
          <p className="w-full truncate text-center">{desc}</p>
        </div>
        {isLoggedIn ? (
          <>
            <div className="flex space-x-2 mt-2">
              <button
                className="border-2 border-black px-1 rounded-full hover:bg-green-100 active:bg-lime-200"
                onClick={handleMinus}
              >
                <FaMinus />
              </button>
              <input
                type="text"
                className="w-16 h-7 rounded-full text-center text-lg p-1"
                value={quant}
                onChange={(e) => {
                  setQuant(e.target.value);
                }}
              />
              <button
                className="border-2 border-black px-1 rounded-full  hover:bg-green-100 active:bg-lime-200"
                onClick={handlePlus}
              >
                <FaPlus />
              </button>
            </div>
            {isInCart ? (
              <div className="flex space-x-6 mt-1">
                <button
                  className={`p-1 rounded-full text-gray-200 bg-gray-700`}
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button className="bg-red-700 p-1 rounded-full text-white" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddNewToCart}
                className="font-semibold p-1 rounded-full bg-amber-400 dark:bg-amber-700 dark:text-gray-200 hover:bg-orange-400 dark:hover:bg-orange-800 active:bg-yellow-400 dark:active:bg-yellow-500 dark:active:text-black"
              >
                Add To Cart
              </button>
            )}
          </>
        ) : (
          <span className="font-semibold dark:text-rose-800 text-rose-600">
            <Link href="/login" className="underline italic hover:font-medium">
              Login
            </Link>{" "}
            For Shopping
          </span>
        )}
      </div>
    </div>
  );
}
