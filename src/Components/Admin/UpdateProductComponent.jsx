import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/Contexts/UserContext";

export default function UpdateProductComponent({ id, oldName, oldDesc }) {
  const [name, setName] = useState(oldName);
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(oldDesc);
  const router = useRouter();
  const {user} = useUserContext();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault(e);
    const formData = {
      name: name,
      image: image,
      description: desc,
    };
    const response = await axios.put(
      "http://localhost:5006/api/products/" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const resData = response.data;
    console.log(resData);
    router.push("/admin/product")
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-7 font-tagFont"
      onSubmit={handleUpdateSubmit}
    >
      <div className="flex items-center justify-center space-x-3 font-semibold">
        <span className="w-32 text-right">Product Name</span>
        <input
          type="text"
          placeholder={oldName}
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </div>
      <div className="flex items-center justify-center space-x-3 font-semibold">
        <span className="w-32 text-right">Image</span>
        <input
          type="file"
          className="dark:text-black rounded-full w-60 h-10 p-2 text-md"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
      </div>
      <div className="flex items-center justify-center space-x-3 font-semibold">
        <span className="w-32 text-right">Description</span>
        <textarea
          type="text"
          className="dark:text-black rounded-xl w-48 p-1 h-24 text-md"
          placeholder={oldDesc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          value={desc}
        ></textarea>
      </div>
      <div className="flex space-x-10 items-center">
        <button
          className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 w-24 text-lg font-bold p-2 rounded-full"
          type="submit"
        >
          Update
        </button>
        <Link href="/admin/product" className="text-lg font-bold">
          Back
        </Link>
      </div>
    </form>
  );
}
