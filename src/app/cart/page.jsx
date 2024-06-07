"use client"

import { useUserContext } from "@/Contexts/UserContext";
import { useEffect , useState} from "react";

export default function Page() {
    const {user} = useUserContext();
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userCartItems , setUserCartItems] = useState([]);
    const [loadingCart , setLoadingCart] = useState(true);

    useEffect(()=>{
        const objProps = Object.keys(user);
        setIsLoggedIn(objProps.length !==0);
      },[user]);

    useEffect(()=>{
        setUserCartItems(Array.from(new Set(user.cartItems.map(item => item.salesItem.saleId))));
        setLoadingCart(false);
    },[])

    const testButton = () => {
        console.log(user.cartItems);
        setUserCartItems(Array.from(new Set(user.cartItems.map(item => item.salesItem.saleId))));
        setLoadingCart(false);
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
        <div className="flex flex-col space-y-10 items-center ">
          <h1 className="font-tagFont text-5xl font-bold">My Carts</h1>
          {!loadingCart && (userCartItems.map((item , index) => (
            <span key={index}>{item}</span>
          )))}
          {isLoggedIn && (<button onClick={testButton}>test</button>)}
        </div>
      </main>
    );
  }