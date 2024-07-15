import { useRouter } from "next/navigation";

export default function UserOrderCard({id , location , status , total}){
    const router = useRouter();

    const handleClickOrder = () => {
        console.log(id);
        router.push("/myOrders/"+id);
    };

    return(<div>
        <button className="w-full" onClick={handleClickOrder}>
            <ul className="flex flex-col md:flex-row md:flex-wrap items-center space-x-5 p-1 px-2 border border-gray-500 dark:border-gray-50 hover:border-2 hover:font-semibold rounded-xl">
                <li className="w-[80px] items-center justify-center">{id}</li>
                <li className="w-[150px] items-center justify-center">{location}</li>
                <li className={`w-[130px] items-center justify-center font-semibold
                    ${status === "Cancelled" && `text-gray-700 dark:text-gray-800`}
                    ${status === "Pending" && `text-blue-600 dark:text-blue-800`}
                    ${status === "Ready to Pickup" && `text-emerald-700 dark:text-emerald-800`}
                    ${status === "Expired" && `text-red-700 dark:text-red-800`}`}>{status}</li>
                <li className="w-[80px] items-center justify-center font-bold"><span className="text-lg">$</span>{total.toFixed(2)}</li>
            </ul>
        </button>
    </div>);
}