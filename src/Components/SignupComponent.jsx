"use client";

import Link from "next/link";
import { useState } from "react";
import WarningComponent from "./Sundries/WarningComponent";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupComponent() {
  const [uName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [rePword, setRePword] = useState("");

  const [info, setInfo] = useState("");
  const [warningIsOpen, setWarningIsOpen] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (uName !== "" && email !== "" && mobile!=="" && password !== "" && rePword !== "") {
      try {
        let formData = {
          userName: uName,
          email: email,
          password: password,
          rePassword: rePword,
          phoneNumber: mobile,
        };

        console.log(formData);

        const response = await axios.post(
          "http://localhost:5006/api/account/register",
          formData
        );
        const resData = response.data;
        console.log(resData);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setInfo("Form is not completed!");
      setWarningIsOpen(true);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center space-y-8 font-tagFont"
      onSubmit={handleSignUp}
    >
      {warningIsOpen && (
        <WarningComponent
          info={info}
          close={() => {
            setWarningIsOpen(false);
          }}
        />
      )}

      <div className="flex items-center space-x-3">
        <span className="w-32 text-right">User Name</span>
        <input
          type="text"
          name="name"
          id="name"
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          value={uName}
          onChange={(e) => {
            setUName(e.target.value);
          }}
          placeholder="User Name"
        />
      </div>
      <div className="flex items-center space-x-3">
        <span className="w-32 text-right">Email</span>
        <input
          type="text"
          name="email"
          id="email"
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
      </div>
      <div className="flex items-center space-x-3">
        <span className="w-32 text-right">Mobile</span>
        <input
          type="text"
          name="mobile"
          id="mobile"
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          placeholder="Mobile Number"
        />
      </div>
      <div className="flex items-center space-x-3">
        <span className="w-32 text-right">Password</span>
        <input
          type="password"
          name="pword"
          id="pword"
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </div>
      <div className="flex items-center space-x-3">
        <span className="w-32 text-right">Re-Password</span>
        <input
          type="password"
          name="rePword"
          id="rePword"
          className="dark:text-black rounded-full w-48 h-7 p-2 text-md"
          value={rePword}
          onChange={(e) => {
            setRePword(e.target.value);
          }}
          placeholder="Re-Password"
        />
      </div>
      <div className="flex flex-col items-center space-y-3">
        <button
          className="dark:bg-amber-700 bg-green-800 dark:text-gray-200 text-gray-200 w-24 text-lg font-bold p-2 rounded-full"
          type="submit"
        >
          SignUp
        </button>
        <Link href="login" className="underline hover:italic">
          Have an Account Already? Go To LogIn..
        </Link>
      </div>
    </form>
  );
}
