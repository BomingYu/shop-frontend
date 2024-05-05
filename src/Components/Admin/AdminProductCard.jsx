import Image from "next/image";
import { useState } from "react";

export default function AdminProductCard({ imagePath, name, description }) {
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  return (
    <div className="w-72 h-72 flex items-center justify-center border m-1">
      <div className="flex flex-col items-center justify-center space-y-2 w-[180px] h-[200px]">
        <div className="image-container">
          <Image
            src={imgError ? "/icons/NotFound.jpg" : imagePath}
            alt={name}
            width={100}
            height={100}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="text-lg text-center font-semibold truncate">
            {name}
          </h2>
        </div>
        <div className="w-full items-center justify-center">
          <span className="block text-center w-full truncate">
            {description}
          </span>
        </div>

        <div className="flex items-center space-x-5 m-3">
          <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 text-lg font-bold rounded-full font-bodyFont">
            Edit
          </button>
          <button className="bg-red-700 text-lg font-bold font-bodyFont p-2 rounded-full">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
