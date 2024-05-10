import Link from "next/link";

export default function Page({params}){
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
            <h1>{params.saleId}</h1>
            <Link href={`/admin/sale/${params.saleId}/saleItems`}>Products List</Link>
        </main>
    );
}