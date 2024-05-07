"use client";

import { useState } from "react";

export default function AdminSaleCard() {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <ul className="flex items-center">
      <li className="lg:text-2xl md:text-sm sm:text-sm">
        {isEdit ? <input type="text" /> : "Name"}
      </li>
      <li className="lg:text-2xl md:text-sm sm:text-sm">
        {isEdit ? <input type="text" /> : "Availble"}
      </li>
      <li className="lg:text-2xl md:text-sm sm:text-sm">
        {isEdit ? <input type="date" /> : "Start"}
      </li>
      <li className="lg:text-2xl md:text-sm sm:text-sm">
        {isEdit ? <input type="date" /> : "End"}
      </li>
      {isEdit ? (
        <li className="lg:text-2xl md:text-sm sm:text-sm flex flex-col space-y-3">
          <button className="bg-amber-500 text-lg font-bold font-bodyFont p-1 rounded-full">
            Save
          </button>
          <button
            className="bg-gray-700 text-gray-200 text-lg font-bold font-bodyFont p-1 rounded-full"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            X
          </button>
        </li>
      ) : (
        <li className="lg:text-2xl md:text-sm sm:text-sm">
          <button
            className="bg-gray-400 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-1 text-lg font-bold rounded-full font-bodyFont"
            onClick={() => {
              setIsEdit(!isEdit);
            }}
          >
            Edit
          </button>
        </li>
      )}

      <li className="lg:text-2xl md:text-sm sm:text-sm">
        <button className="bg-red-700 text-lg font-bold font-bodyFont p-2 rounded-full">
          Delete
        </button>
      </li>
    </ul>
  );
}
