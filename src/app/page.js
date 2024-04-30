"use client"

import Image from "next/image";
import { useUserContext } from "@/Contexts/UserContext";
import LoginComponent from "@/Components/LoginComponent";

export default function Home() {
  const{user} = useUserContext();
  const testButton = () => {
    console.log(user);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
        <button onClick={testButton}>Test button</button>
    </main>
  );
}
