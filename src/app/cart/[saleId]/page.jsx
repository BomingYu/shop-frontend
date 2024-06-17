"use client"

import { useUserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({params}){
    const {user} = useUserContext();
    const [sale , setSale] = useState();
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        const getUserCartInThisCart = async() => {
            const response = await axios.get(`http://localhost:5006/api/sales/sale/withCart/${params.saleId}/${user.id}`);
            const saleRes = response.data;
            setSale(saleRes);
            setLoading(false);
        }
        getUserCartInThisCart();
    },[]);

    const testButton = () => {
        console.log(sale);
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA font-bodyFont">
            {loading ? (<h1 className="text-5xl font-bold">Loading...</h1>) : (
                <div>
                    <button onClick={testButton}>Test</button>
                </div>
            )}
        </main>
    );
}