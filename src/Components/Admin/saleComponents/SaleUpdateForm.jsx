"use client";

import WarningComponent from "@/Components/Sundries/WarningComponent";
import axios from "axios";
import { useState } from "react";

export default function SaleUpdateForm({
  id,
  name,
  available,
  endAt,
  handleCancel,
}) {
  const [nameValue, setName] = useState(name);
  const [validSale, setValidSale] = useState(available);
  //const [start, setStart] = useState(startAt);
  const [end, setEnd] = useState(endAt);

  const [error, setError] = useState("");
  const [errorShow, setErrorShow] = useState(false);

  // const handleStartChange = (e) => {
  //   if (end && e.target.value > end) {
  //     setError("Start date cannot be later than end date");
  //     setErrorShow(true);
  //     setStart("");
  //   } else {
  //     setStart(e.target.value);
  //   }
  // };

  const handleEndChange = (e) => {
    // if (start && e.target.value < start) {
    //   setError("End date cannot be earlier than start date");
    //   setErrorShow(true);
    //   setEnd("");
    // } else {
      setEnd(e.target.value);
    //}
  };

  const handleUpdateSale = async (e) => {
    e.preventDefault();
      const formData = {
        name: nameValue,
        isAvailable: validSale,
        //startAt: start,
        endAt: end,
      };
      const response = await axios.put(
        "http://localhost:5006/api/sales/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formData);
      console.log(response.data);
      handleCancel();
  };

  const handleCancelButton = () => {
    handleCancel();
  };

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
      {errorShow && (
        <WarningComponent
          info={error}
          close={() => {
            setErrorShow(false);
          }}
        />
      )}
      <div className="flex space-x-3">
        <span className="w-24 text-right">End</span>
        <input
          type="date"
          className="rounded-full p-1"
          value={end}
          onChange={handleEndChange}
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
