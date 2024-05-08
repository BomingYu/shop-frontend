"use client";

import { useState } from "react";

export default function SaleUpdateForm({id , name , available , startAt , endAt , handleCancel}) {
  const [nameValue, setName] = useState(name);
  const [validSale, setValidSale] = useState(available);
  const [start, setStart] = useState(startAt);
  const [end, setEnd] = useState(endAt);

  const handleUpdateSale = (e) => {
    e.preventDefault();
    console.log(nameValue);
    console.log(validSale);
    console.log(start);
    console.log(end);
  };

  const handleCancelButton = () => {
    handleCancel();
  }

  return (
    <form
      className="flex flex-col space-y-3 font-bodyFont font-semibold items-center justify-center lg:text-2xl md:text-lg sm:text-sm xs:text-sm"
      onSubmit={handleUpdateSale}
    >
      <div className="flex space-x-3">
        <span className="w-24 text-right">Name</span>
        <input
          type="text"
          className="rounded-full p-1"
          value={nameValue}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex space-x-3">
        <input
          type="checkbox"
          id="myCheckbox"
          name="myCheckbox"
          value={validSale}
          checked={validSale}
          onChange={() => setValidSale(!validSale)}
        />
        <span className="w-24 text-left">
          {validSale ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="flex space-x-3">
        <span className="w-24 text-right">Start</span>
        <input
          type="date"
          className="rounded-full p-1"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </div>
      <div className="flex space-x-3">
        <span className="w-24 text-right">End</span>
        <input
          type="date"
          className="rounded-full p-1"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </div>
      <div className="flex space-x-3">
        <button
          type="submit"
          className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 font-bold p-1 rounded-full"
        >
          Save
        </button>
        <button
          className="bg-gray-700 text-gray-100 p-1 rounded-full"
          onClick={handleCancelButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
