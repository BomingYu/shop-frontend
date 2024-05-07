import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
      <div className="flex flex-col space-y-10 items-center ">
        <h1 className="font-tagFont text-5xl font-bold">Admin Page</h1>
        <Link href="/admin/product" className="bg-amber-400 dark:bg-yellow-700 dark:text-gray-300 p-3 rounded-full text-xl font-semibold font-tagFont">Product Management</Link>
        <Link href="/admin/sale" className="bg-amber-400 dark:bg-yellow-700 dark:text-gray-300 p-3 rounded-full text-xl font-semibold font-tagFont">Sales Management</Link>
        <Link href="#" className="bg-amber-400 dark:bg-yellow-700 dark:text-gray-300 p-3 rounded-full text-xl font-semibold font-tagFont">Customer Management</Link>
        <Link href="#" className="bg-amber-400 dark:bg-yellow-700 dark:text-gray-300 p-3 rounded-full text-xl font-semibold font-tagFont">Order Management</Link>
      </div>
    </main>
  );
}
