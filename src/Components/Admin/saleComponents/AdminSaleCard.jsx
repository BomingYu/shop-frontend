"use client";

import { useState } from "react";
import SaleUpdateForm from "./SaleUpdateForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSaleCard({
  saleId,
  name,
  available,
  endAt,
  stateChange,
  status,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const convertActive = (avail) => {
    if (avail === true) {
      return "Valid";
    } else {
      return "Invalid";
    }
  };

  const convertDate = (date) => {
    if (date == "" || date == null) {
      return "Undefined";
    } else {
      return date;
    }
  };

  const handleDeleteSale = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5006/api/sales/" + saleId
      );
      router.refresh();
      stateChange();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-slate-800 p-2 rounded-lg">
      {isEdit ? (
        <SaleUpdateForm
          id={saleId}
          name={name}
          available={available}
          //startAt={startAt}
          endAt={endAt}
          handleCancel={() => setIsEdit(!isEdit)}
          status={status}
        />
      ) : (
        <ul
          className={`flex items-center justify-center lg:space-x-7 md:space-x-7 sm:space-x-3 xs:space-x-2 font-bodyFont`}
        >
          <li className="lg:text-2xl md:text-lg sm:text-sm xs:text-sm w-36 truncate">
            {name}
          </li>
          <li
            className={`lg:text-lg md:text-lg sm:text-sm xs:text-sm w-[60px] ${
              available ? `text-cyan-900` : `text-red-700`
            } font-semibold`}
          >
            {convertActive(available)}
          </li>
          <li className={`lg:text-lg md:text-lg sm:text-sm xs:text-sm w-[135px] text-center font-bold
            ${status === `Active` && `text-amber-900`}
            ${status === `Ready to Pickup` && `text-lime-800`}`}>
            {status}
          </li>
          <li className="w-[205px] flex items-center justify-center">
            {status === "Ready to Pickup" ? (
              <button className="text-center items-center bg-black text-white p-1 font-bold rounded-full flex flex-col w-full">
                <span>Change to </span> <span>"Active"</span> 
              </button>
            ) : (
              <button className="text-center items-center rounded-full bg-gray-300 text-black p-1 font-bold flex flex-col w-full">
                <span>Change to </span> <span>"Ready to Pickup"</span> 
              </button>
            )}
          </li>
          <li className="lg:text-lg md:text-md sm:text-sm xs:text-sm">
            End to
          </li>
          <li
            className={`lg:text-lg md:text-md sm:text-sm xs:text-sm w-[105px] ${
              convertDate(endAt) == "Undefined" && `text-red-700 font-bold`
            }`}
          >
            {convertDate(endAt)}
          </li>
          <li className="lg:text-2xl md:text-lg sm:text-sm xs:text-sm">
            <button
              className="bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-1 text-lg font-bold rounded-full font-bodyFont"
              onClick={() => {
                setIsEdit(!isEdit);
                stateChange();
              }}
            >
              Edit
            </button>
          </li>
          <li className="lg:text-2xl md:text-sm">
            <button
              className="bg-red-700 text-lg font-bold font-bodyFont p-1 rounded-full"
              onClick={handleDeleteSale}
            >
              Delete
            </button>
          </li>
          <li className="lg:text-2xl md:text-sm">
            <Link
              href={`/admin/sale/${saleId}`}
              className="bg-amber-500 text-lg font-bold font-bodyFont p-1 rounded-full"
            >
              View
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
