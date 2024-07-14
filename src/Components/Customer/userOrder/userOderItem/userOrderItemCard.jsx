import Image from "next/image";
import { useState } from "react";

export default function UserOrderItemCard({item}){
    const [imgError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
      };
    return(<div className="flex space-x-2 items-center border p-1 border-gray-600 rounded-lg">
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
          <span className="w-[100px]">{item.salesItem.product.name}</span>
          <span>{item.price}/{item.salesItem.unit}</span>
          <span>*</span>
          <span>{item.quatity}</span>
          <span className="font-semibold">${item.subtotal}</span>
    </div>);
}