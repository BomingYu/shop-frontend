export default function CartSaleCard({name , endAt}){
    return(
    <button>
        <ul>
            <li>{name}</li>
            <li>End At {endAt}</li>
        </ul>
    </button>
    );
}