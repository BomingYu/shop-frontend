"use client"

import Image from "next/image";
import { useState } from "react";

export default function SingleProductCard({name , imgPath}) {
    const [imgError , setImgError] = useState(false);
    const handleImageError = () => {
        setImgError(true);
    }
  return (
    <div className="w-24 h-32 flex items-center justify-center border m-1 rounded-lg font-bodyFont">
      <div className="flex flex-col items-center justify-center space-y-1 w-20 h-20">
        <div className="image-container">
        <Image
            //src={imgError ? "/icons/NotFound.jpg" : imgPath}
            src={imgError ? "/icons/NotFound.jpg" : imgPath || "/icons/NotFound.jpg"}
            alt={name}
            width={60}
            height={60}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <h1 className="font-semibold">{name}</h1>
      </div>
    </div>
  );
}
