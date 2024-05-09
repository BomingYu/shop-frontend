"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import WarningComponent from "@/Components/Sundries/WarningComponent";

export default function Page() {
  const [name, setName] = useState("");
  const [validSale, setValidSale] = useState(true);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");
  const [errorShow, setErrorShow] = useState(false);

  const handleStartChange = (e) => {
    if (end && e.target.value > end) {
      setError("Start date cannot be later than end date");
      setErrorShow(true);
      setStart("");
    } else {
      setStart(e.target.value);
    }
  };

  const handleEndChange = (e) => {
    if (start && e.target.value < start) {
      setError("End date cannot be earlier than start date");
      setErrorShow(true);
      setEnd("");
    } else {
      setEnd(e.target.value);
    }
  };

  const handleSubmitNewSale = async (e) => {
    e.preventDefault();
    if (start !== "") {
      const formData = {
        name: name,
        isAvailable: validSale,
        startAt: start,
        endAt: end,
      };
      const response = await axios.post(
        "http://localhost:5006/api/sales",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      console.log(data);
      router.push("/admin/sale");
    } else {
      setError("Start date connot be empty");
      setErrorShow(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="font-tagFont flex flex-col space-y-5 items-center justify-center">
        <h1 className="text-5xl font-bold">New Sales</h1>
        {errorShow && (
          <WarningComponent
            info={error}
            close={() => {
              setErrorShow(false);
            }}
          />
        )}
        <form
          className="mt-10 flex flex-col space-y-5 items-center justify-center"
          onSubmit={handleSubmitNewSale}
        >
          <div className="flex space-x-2 items-center justify-center">
            <span className="w-18 text-right">Name</span>
            <input
              type="text"
              className="dark:text-black rounded-full w-48 h-8 p-2 text-md"
              placeholder="Sale Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex space-x-2 items-center justify-center">
            <input
              type="checkbox"
              checked={validSale}
              value={validSale}
              onChange={() => setValidSale(!validSale)}
            />
            <span className="w-18 text-left">
              {validSale ? "Active" : "Inactive"}
            </span>
          </div>
          <div className="flex space-x-2 items-center justify-center">
            <span className="w-18 text-right">Start</span>
            <input
              type="date"
              className="dark:text-black rounded-full w-48 h-8 p-2 text-md"
              value={start}
              onChange={handleStartChange}
            />
          </div>
          <div className="flex space-x-2 items-center justify-center">
            <span className="w-18 text-right">End</span>
            <input
              type="date"
              className="dark:text-black rounded-full w-48 h-8 p-2 text-md"
              value={end}
              onChange={handleEndChange}
            />
          </div>
          <div className="flex items-center justify-center space-x-10">
            <button
              type="submit"
              className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 w-24 text-lg font-bold p-2 rounded-full"
            >
              Add
            </button>
            <Link
              href="/admin/sale"
              className="text-lg font-semibold underline hover:italic"
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
