import AdminSaleCard from "@/Components/Admin/saleComponents/AdminSaleCard";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col space-y-10 items-center ">
        <h1 className="font-tagFont text-5xl font-bold">Sales</h1>
        <AdminSaleCard />
      </div>
    </main>
  );
}