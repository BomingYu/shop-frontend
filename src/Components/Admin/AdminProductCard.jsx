import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminProductCard({ id , imagePath, name, description }) {
  const [imgError, setImgError] = useState(false);
  const router = useRouter();

  const handleImageError = () => {
    setImgError(true);
  };

  const handleDeleteProduct = async() => {
    console.log(id);
    try{
      var response = await axios.delete("http://localhost:5006/api/products/"+id);
      console.log(response.data);
      router.push("/admin/product");
    }
    catch(error){
      console.log(error);
    }
  }

  const handleUpdateProduct = () => {
    router.push("/admin/product/update/"+id);
  }

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
          <button className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 text-lg font-bold rounded-full font-bodyFont" onClick={handleUpdateProduct}>
            Edit
          </button>
          <button className="bg-red-700 text-lg font-bold font-bodyFont p-2 rounded-full" onClick={handleDeleteProduct}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
