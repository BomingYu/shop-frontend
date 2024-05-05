"use client";

import axios from "axios";
//import { headers } from "next/headers";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddNewProduct = async (e) => {
    e.preventDefault(e);
    console.log(name);
    console.log(image);
    console.log(desc);
    
    const formData = {name:name , image:image , description:desc};

    const response = await axios.post("http://localhost:5006/api/products" , formData , {headers:{"Content-Type": "multipart/form-data"}});
    const data = response.data;
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col space-y-10 items-center ">
        <h1 className="font-tagFont text-5xl font-bold">Add New Product</h1>
        <form
          className="flex flex-col space-y-8 items-center justify-center"
          onSubmit={handleAddNewProduct}
        >
          <div className="flex space-x-2 font-tagFont items-center">
            <span className="w-32 text-right">Product Name</span>
            <input
              type="text"
              className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex space-x-2 font-tagFont items-center">
            <span className="w-32 text-right">Image</span>
            <input
              type="file"
              className="dark:text-black rounded-full w-60 h-10 p-2 text-md"
              onChange={(e)=>{setImage(e.target.files[0])}}
            />
          </div>
          <div className="flex space-x-2 font-tagFont items-center">
            <span className="w-32 text-right">Description</span>
            <textarea
              type="text"
              className="dark:text-black rounded-xl w-48 p-1 h-24 text-md"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 w-24 text-lg font-bold p-2 rounded-full"
          >
            Add
          </button>
        </form>
      </div>
    </main>
  );
}
