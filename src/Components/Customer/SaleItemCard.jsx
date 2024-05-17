"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function SaleItemCard({name , price , unit , desc , imagePath}) {
  const [imgError, setImageError] = useState(false);
  const [quant , setQuant] = useState(0);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleMinus = () => {
    if(quant > 0){
        setQuant(quant - 1);
    }
  }

  const handlePlus = () => {
    if(quant < 999){
        setQuant(quant +1);
    }
  }
  return (
    <div className="w-64 h-72 flex items-center justify-center border m-1 rounded-lg">
      <div className="flex flex-col items-center justify-center space-y-1 w-[180px] h-[200px]">
        <div className="image-container">
          <Image
            src={imgError ? "/icons/NotFound.jpg" : imagePath}
            //src="https://sqlboldstorage.blob.core.windows.net/shopcontianer/psc (71).jpeg"
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
          <p className="w-full truncate text-center">
            {desc}
          </p>
        </div>
        <div className="flex space-x-2 mt-2">
          <button className="border-2 border-black px-1 rounded-full hover:bg-green-100 active:bg-lime-200" onClick={handleMinus}>
            <FaMinus />
          </button>
          <input
            type="text"
            className="w-16 h-7 rounded-full text-center text-lg p-1"
            value={quant}
            onChange={(e)=>{setQuant(e.target.value)}}
          />
          <button className="border-2 border-black px-1 rounded-full  hover:bg-green-100 active:bg-lime-200" onClick={handlePlus}>
            <FaPlus />
          </button>
        </div>
        <button className="font-semibold p-1 rounded-full bg-amber-400 dark:bg-amber-700 dark:text-gray-200 hover:bg-orange-400 dark:hover:bg-orange-800 active:bg-yellow-400 dark:active:bg-yellow-500 dark:active:text-black">Add To Cart</button>
      </div>
    </div>
  );
}
