"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({params}){
    const router = useRouter();
    //const [productId , setProductId] = useState();

    const handleChangeProductId = (productId) => {
        router.push(`/admin/sale/${params.saleId}/${productId}`);
    }

    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
            <ul>
                <li>{params.saleId}</li>
                <li onClick={()=>handleChangeProductId(1)}>P1</li>
                <li onClick={()=>handleChangeProductId(2)}>P2</li>
                <li onClick={()=>handleChangeProductId(3)}>P3</li>
                <li onClick={()=>handleChangeProductId(4)}>P4</li>
                <li onClick={()=>handleChangeProductId(5)}>P5</li>
                <li onClick={()=>handleChangeProductId(6)}>P6</li>
            </ul>
        </main>
    );
}