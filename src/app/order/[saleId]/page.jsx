"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState , useEffect } from "react";
import { useUserContext } from "@/Contexts/UserContext";
import OrderDetailCard from "@/Components/Customer/order/OrderDetailCard";

export default function Page({params}){
    const router = useRouter();
    const [cartItems , setCartItems] = useState([]);
    const [loading ,setLoading] = useState(true);
    const {user} = useUserContext();

    useEffect(()=>{
        const getCartItems = async() => {
            const response = await axios.get(`http://localhost:5006/api/sales/sale/withCart/${params.saleId}/${user.id}`);
            const saleRes = response.data;
            setCartItems(saleRes.salesItems);
            setLoading(false);
        }
        getCartItems();
    },[]);

    const testButton = () => {
        console.log(cartItems);
        console.log(user);
    }
    return(<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
        <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold">Order Detail</h1>
            {loading ? (<h1 className="text-4xl font-bold">Loading...</h1>) : (
                <div className="flex flex-col items-center">
                    <OrderDetailCard items={cartItems}/>
                    <button onClick={testButton}>Test</button>
                </div>
            )}
        </div>
    </main>);
}