"use client";

import { useState } from "react";
import SaleUpdateForm from "./SaleUpdateForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSaleCard({ saleId, name, available, startAt, endAt }) {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const convertActive = (avail) => {
    if (avail === true) {
      return "Active";
    } else {
      return "Inactive";
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
          startAt={startAt}
          endAt={endAt}
          handleCancel={() => setIsEdit(!isEdit)}
        />
      ) : (
        <ul
          className={`flex items-center justify-center lg:space-x-10 md:space-x-7 sm:space-x-3 xs:space-x-2 font-bodyFont`}
        >
          <li className="lg:text-2xl md:text-lg sm:text-sm xs:text-sm w-36 truncate">
            {name}
          </li>
          <li
            className={`lg:text-2xl md:text-lg sm:text-sm xs:text-sm w-24 ${
              available ? `text-cyan-900` : `text-red-700`
            } font-semibold`}
          >
            {convertActive(available)}
          </li>
          <li className="lg:text-2xl md:text-lg sm:text-sm xs:text-sm w-36">
            {convertDate(startAt)}
          </li>
          <li className="lg:text-2xl md:text-lg sm:text-sm xs:text-sm w-8">
            TO
          </li>
          <li
            className={`lg:text-2xl md:text-lg sm:text-sm xs:text-sm w-36 ${
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
            <Link href={`/admin/sale/${saleId}`} className="bg-amber-500 text-lg font-bold font-bodyFont p-1 rounded-full">
              View
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
