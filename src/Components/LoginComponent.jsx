"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/Contexts/UserContext";
import WarningComponent from "./Sundries/WarningComponent";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {user , setUser} = useUserContext();

  const [info , setInfo] = useState("");
  const [showInfo , setShowInfo] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(email + password);

    let formData = { email: email, password: password };

    try {
      const response = await axios.post(
        "http://localhost:5006/api/account/login",
        formData
      );
      const resUser = response.data;
      setUser(resUser);
      router.push("/");
      console.log(resUser);
    } catch (error) {
      setInfo("Invalid Email or Password!");
      setShowInfo(true);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-8 font-tagFont"
      onSubmit={handleLoginSubmit}
    >
      <div className="flex items-center space-x-3">
        <span className="w-24 text-right">Email</span>
        <input
          type="text"
          name="email"
          id="email"
          onChange={handleEmailChange}
          value={email}
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          placeholder="Email"
        />
      </div>
      <div className="flex items-center space-x-3">
        <span className="w-24 text-right">Password</span>
        <input
          type="password"
          name="pWord"
          id="pWord"
          onChange={handlePasswordChange}
          value={password}
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          placeholder="Password"
        />
      </div>
     
      <div className="flex items-center space-x-5">
        <button
          className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 w-24 text-lg font-bold p-2 rounded-full"
          type="submit"
        >
          Login
        </button>
        <Link href="signup" className="underline hover:italic">
          No Account? Sign Up Here
        </Link>
      </div>
      {showInfo && (<WarningComponent info={info} close={()=>{setShowInfo(false)}}/>)}
    </form>
  );
}
