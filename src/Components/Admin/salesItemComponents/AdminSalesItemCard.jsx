import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function AdminSalesItemCard({
  id,
  name,
  desc,
  price,
  unit,
  imgPath,
}) {
  const [imgError, setImgError] = useState(false);
  //const [isEdit, setIsEdit] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleDeleteSaleItem = async () => {
    console.log(id);
    const response = await axios.delete(
      "http://localhost:5006/api/salesitems/" + id
    );
    const resData = response.data;
    console.logresData;
  };
  return (
    <div className="w-72 h-72 flex items-center justify-center border m-1 rounded-lg font-bodyFont">
      <div className="flex flex-col items-center justify-center space-y-1 w-[180px] h-[200px]">
        <div className="image-container">
          <Image
            src={imgError ? "/icons/NotFound.jpg" : imgPath}
            alt={name}
            width={100}
            height={100}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="text-lg text-center font-semibold truncate">{name}</h2>
        </div>
        <div className="w-full items-center justify-center">
          <span className="block text-center w-full truncate">{desc}</span>
        </div>
        <div className="w-full items-center justify-center flex space-x-2">
          <span className="block text-center">{price}</span>
          <span className="block text-center">/</span>
          <span className="block text-center">{unit}</span>
        </div>
        <div className="flex items-center justify-center space-x-5 m-3">
          {/* <button 
          onClick={()=>setIsEdit(true)}
          className="bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 text-lg font-bold rounded-full font-bodyFont">
            Edit
          </button> */}
          <button
            className="bg-red-700 text-lg font-bold font-bodyFont p-2 rounded-full"
            onClick={handleDeleteSaleItem}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
