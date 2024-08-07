import { useRouter } from "next/navigation";

export default function CartSaleCard({id, name , endAt}){
    const router = useRouter();

    const handleButtonClick = () => {
        console.log(id);
        router.push("/cart/"+id);
    }
    
    return(
    <button className="border dark:border-gray-100 border-gray-500 p-1 rounded-md hover:border-yellow-500" onClick={handleButtonClick}>
        <ul className="flex flex-col sm:flex-row space-x-3 p-1">
            <li className="font-semibold">{name}</li>
            <li>End to{" "} <span className="font-semibold">{endAt}</span></li>
        </ul>
    </button>
    );
}