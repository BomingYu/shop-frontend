import { useState } from "react";
import UserOrderItemCard from "./userOderItem/userOrderItemCard";

export default function UserOrderDetailCard({ order }) {
  const [orderItems] = useState(order.orderItems);
  const showAddress = () => {
    if (order.pickLocation === "Borman Fresh") {
      return "1/5 Borman Road";
    }
    return "680 Gray Street";
  };
  const shownStatus = () => {
    if(order.sale.status === "Active"){
        return "Created";
    }
    if(order.status === "Cancelled"){
        return "Cancelled";
    }
    return order.sale.status;
}
  return (
    <div className="flex flex-col md:flex-row gap-5 items-center">
      <div>
        <ul className="w-[300px] flex flex-col space-y-2">
          <li className="flex items-center space-x-2">
            <span className="w-[120px] text-right">Name :</span>
            <span className="w-[170px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
              {order.name}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-[120px] text-right">Phone :</span>
            <span className="w-[170px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
              {order.contact}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-[120px] text-right">Pickup Location :</span>
            <span className="w-[170px] break-all font-semibold">
              {order.pickLocation}
              <br />
              {showAddress()}
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-[120px] text-right">Status :</span>
            <span className={`w-[170px] overflow-hidden text-ellipsis whitespace-nowrap font-semibold 
              ${shownStatus() === "Cancelled" && `text-gray-700 dark:text-gray-800`}
              ${shownStatus() === "Created" && `text-blue-600 dark:text-blue-800`}
              ${shownStatus() === "Ready to Pickup" && `text-green-600 dark:text-lime-900`}
              ${shownStatus() === "Expired" && `text-red-700 dark:text-red-800`}`}>
              {shownStatus()}
            </span>
          </li>
          <li className="w-full flex items-center space-x-2">
            <span className="w-[120px] text-right">Note :</span>
            <span className="w-[170px] break-all font-semibold">
              {order.note}
            </span>
          </li>
        </ul>
      </div>

      <hr className="my-4 w-full border-t border-gray-900 md:hidden" />

      <div className="flex flex-col space-y-2">
        <div className="flex items-center p-1 space-x-1 w-full justify-end">
          <span>Total : </span>
          <span className="text-xl underline decoration-double underline-offset-4 font-semibold">
            ${order.total}
          </span>
        </div>
        {orderItems.map((item) => (
          <UserOrderItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
