import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function ProductSelectForSale({name , desc , imgPath , onHandleSelect}) {
    const [imgError, setImgError] = useState(false);

    const handleImageError = () => {
        setImgError(true);
    }

    const handleSelectProduct = () => {
        onHandleSelect();
    }

  return (
    <div className="w-48 h-56 flex items-center justify-center border m-1 rounded-lg font-bodyFont">
      <div className="flex flex-col items-center justify-center space-y-2 w-[100px] h-[150px]">
      <div className="image-container">
        <Image
            //src={imgError ? "/icons/NotFound.jpg" : imgPath}
            src={imgError ? "/icons/NotFound.jpg" : imgPath || "/icons/NotFound.jpg"}
            alt={name}
            width={70}
            height={70}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="block text-center w-full truncate">{name}</h2>
        </div>
        <div className="w-full items-center justify-center">
          <span className="block text-center w-full truncate">{desc}</span>
        </div>
        <button className="bg-amber-400 dark:bg-amber-700 text-gray-800 dark:text-gray-200 p-1 text-lg font-bold rounded-full font-bodyFont" onClick={handleSelectProduct}>Select</button>
      </div>
    </div>
  );
}
