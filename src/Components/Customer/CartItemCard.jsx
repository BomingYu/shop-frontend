import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItemCard({id , name , price , unit , quant , subTotal , imagePath}) {
  const [quantity, setQuantity] = useState(quant);
  const [total, setTotal] = useState(subTotal);
  const [changed, setChanged] = useState(false);
  const [imgError, setImageError] = useState(false);

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity]);

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setChanged(true);
    }
  };

  const handlePlus = () => {
    if (quantity < 999) {
      setQuantity(quantity + 1);
      setChanged(true);
    }
  };

  const handleUpdate = () => {
    console.log(id);
  };

  const handleDelete = () => {
    console.log(id);
  };

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="flex flex-col space-y-1 items-center justify-center border p-1 rounded-lg w-[345px] h-[75px]">
      <div className="flex flex-row items-center justify-center space-x-3">
        <div>
          <Image
            src={
              imgError
                ? "/icons/NotFound.jpg"
                : imagePath || "/icons/NotFound.jpg"
            }
            alt={name}
            width={30}
            height={30}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div>
          <span>{name}</span>
        </div>
        <div>
          <span className="font-semibold">${price}</span>
          <span>/</span>
          <span>{unit}</span>
        </div>
        <div className="flex flex-row space-x-1">
          <button
            className="border-2 border-black px-1 rounded-full hover:bg-green-100 active:bg-lime-200"
            onClick={handleMinus}
          >
            <FaMinus />
          </button>
          <input
            type="text"
            className="w-12 h-7 rounded-full text-center text-lg p-1"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
          <button
            className="border-2 border-black px-1 rounded-full  hover:bg-green-100 active:bg-lime-200"
            onClick={handlePlus}
          >
            <FaPlus />
          </button>
        </div>
        <div>
          <span className="text-lg font-semibold">${total}</span>
        </div>
      </div>

      <div className="flex space-x-1">
        {changed && (
          <button className="p-1 font-semibold rounded-full text-gray-700 bg-amber-500" onClick={handleUpdate}>
            Update
          </button>
        )}
        <button className="p-1 font-semibold rounded-full text-gray-200 bg-red-700" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
