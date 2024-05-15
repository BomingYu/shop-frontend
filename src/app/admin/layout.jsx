import Link from "next/link";

export default function Layout({children}){
    return(
        <div>
        <ul className="flex space-x-24 font-navBarFont font-semibold justify-end items-center px-5 dark:bg-cyan-900 dark:text-yellow-200 sticky top-12">
            <li>
                <Link href="/admin/product">Product Management</Link>
            </li>
            <li>
                <Link href="/admin/sale">Sales Management</Link>
            </li>
            <li>
                <Link href="#">Customer Management</Link>
            </li>
            <li>
                <Link href="#">Order Management</Link>
            </li>
        </ul>
        {children}
        </div>
    );
}