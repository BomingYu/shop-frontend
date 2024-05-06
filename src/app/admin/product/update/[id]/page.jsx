"use client"

import UpdateProductComponent from "@/Components/Admin/UpdateProductComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Page({params}){
    const [product , setProduct] = useState({});
    const [loading ,setLoading] = useState(false);

    useEffect(()=>{
        const getProductById = async() => {
            const response = await axios.get("http://localhost:5006/api/products/"+params.id);
            const productRes = response.data;
            setProduct(productRes);
            setLoading(false);
        }
        getProductById()
    },[]);

    const handleTestButton = () => {
        console.log(product);
    }
    
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
            <h1 className="font-tagFont text-5xl font-bold">Product Update</h1>
            {loading ? (<h1>Loading</h1>) : (<UpdateProductComponent id={params.id} oldName={product.name} oldDesc={product.description}/>)}
            {loading ? (<h1>Loading</h1>) : (<button onClick={handleTestButton}>testbutton</button>)}
        </main>
    );
}