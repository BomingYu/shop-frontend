export default function CartSaleCard({id, name , endAt}){
    const handleButtonClick = () => {
        console.log(id);
    }
    
    return(
    <button className="border dark:border-gray-100 border-gray-500 p-1 rounded-md hover:border-yellow-500" onClick={handleButtonClick}>
        <ul>
            <li className="font-semibold">{name}</li>
            <li>End At: <span className="font-semibold">{endAt}</span></li>
        </ul>
    </button>
    );
}