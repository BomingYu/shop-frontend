export default function Page({params}){
    return(
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
            <h1>{params.saleId}</h1>
            <h1>{params.productId}</h1>
        </main>
    );
}