import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItemCard() {
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setTotal(quantity * 10);
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
  return (
    <div className="flex flex-col space-y-1 items-center justify-center border p-1 rounded-lg">
      <div className="flex flex-row items-center justify-center space-x-3">
        <div>
          <Image
            width={30}
            height={30}
            src="https://sqlboldstorage.blob.core.windows.net/shopcontianer/psc %28100%29.jpeg"
          />
        </div>
        <div>
          <span>Name</span>
        </div>
        <div>
          <span className="font-semibold">price</span>
          <span>/</span>
          <span>Unit</span>
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
          <button className="p-1 font-semibold rounded-full text-gray-700 bg-amber-500">
            Update
          </button>
        )}
        <button className="p-1 font-semibold rounded-full text-gray-200 bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}
