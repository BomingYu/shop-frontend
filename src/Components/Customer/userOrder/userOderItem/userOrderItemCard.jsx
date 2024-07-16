import Image from "next/image";
import { useState } from "react";

export default function UserOrderItemCard({item}){
    const [imgError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
      };
    return(<div className="flex space-x-1 items-center border p-1 border-gray-600 rounded-lg h-[45px]">
        <Image
            src={
              imgError
                ? "/icons/NotFound.jpg"
                : item.salesItem.product.image || "/icons/NotFound.jpg"
            }
            alt={item.id}
            width={30}
            height={30}
            onError={handleImageError}
            objectFit="cover"
            objectPosition="center"
          />
          <span className="w-[100px] text-center overflow-hidden text-ellipsis whitespace-nowrap">{item.salesItem.product.name}</span>
          <span className="w-[70px] text-right">{item.price}/{item.salesItem.unit}</span>
          <span className="text-2xl">*</span>
          <span className="w-[35px]">{item.quatity}</span>
          <span className="font-semibold w-[70px] text-right">${item.subtotal}</span>
    </div>);
}