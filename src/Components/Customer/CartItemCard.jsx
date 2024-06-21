import Image from "next/image";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useUserContext } from "@/Contexts/UserContext";

export default function CartItemCard({
  id,
  name,
  price,
  unit,
  quant,
  subTotal,
  imagePath,
  handleRefresh,
}) {
  const [quantity, setQuantity] = useState(quant);
  const [total, setTotal] = useState(subTotal);
  const [changed, setChanged] = useState(false);
  const [imgError, setImageError] = useState(false);
  const {user} = useUserContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const objProps = Object.keys(user);
    setIsLoggedIn(objProps.length !== 0);
  }, [user]);

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

  const handleUpdate = async () => {
    if (quantity === 0) {
      const confirm = window.confirm("Set quantity to 0. Remove item from cart?"); 
      if(confirm){
        await handleDelete();
      }
    }
    else if (quantity > 0) {
      const formData = {
        quantity: quantity,
        total: price * quantity,
      };
      console.log(formData);
      const response = await axios.put(
        "http://localhost:5006/api/cartItem/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setChanged(false);
    }
    else{
      alert("Quantity cannot be less than 0!");
      setQuantity(1);
    }
    handleRefresh();
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:5006/api/cartItem/" + id
    );
    console.log(id);
    handleRefresh();
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
          <button
            className="p-1 font-semibold rounded-full text-gray-700 bg-amber-500"
            onClick={handleUpdate}
          >
            Update
          </button>
        )}
        <button
          className="p-1 font-semibold rounded-full text-gray-200 bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
