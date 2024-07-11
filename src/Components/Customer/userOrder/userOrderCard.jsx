export default function UserOrderCard({id , location , status , total}){
    return(<div>
        <button className="w-full">
            <ul className="flex flex-col md:flex-row md:flex-wrap items-center space-x-5 p-1 px-2 border border-gray-500 dark:border-gray-50 hover:border-2 hover:font-semibold rounded-xl">
                <li className="w-[80px] items-center justify-center">{id}</li>
                <li className="w-[150px] items-center justify-center">{location}</li>
                <li className="w-[130px] items-center justify-center">{status}</li>
                <li className="w-[80px] items-center justify-center font-bold"><span className="text-lg">$</span>{total.toFixed(2)}</li>
            </ul>
        </button>
    </div>);
}