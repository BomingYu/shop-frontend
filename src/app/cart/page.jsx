"use client"

import CartSaleCard from "@/Components/Customer/CartSaleCard";
import { useUserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { useEffect , useState} from "react";

export default function Page() {
    const {user} = useUserContext();
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [userCart , setUserCart] = useState([]);
    const [cartSale, setCartSale] = useState([]);
    const [loadingCart , setLoadingCart] = useState(true);

    useEffect(()=>{
        const objProps = Object.keys(user);
        setIsLoggedIn(objProps.length !==0);
      },[user]);

    useEffect(()=>{
        const getUserCart = async() => {
            const responseFirstStep = await axios.get("http://localhost:5006/api/cartItem/user/"+user.id);
            const userCartRes = responseFirstStep.data;
            const cartArray = Array.from(new Set(userCartRes.map(item => item.salesItem.saleId)));
            setUserCart(cartArray);

            const responseSecondStep = await axios.post("http://localhost:5006/api/sales/salesByUserCart" , userCart);
            const userCartSaleRes = responseSecondStep.data;
            setCartSale(userCartSaleRes);

            setLoadingCart(false);
            console.log(userCartSaleRes);
        }
        getUserCart();
    },[]);

    const testButton = async() => {
        //console.log(user.cartItems);
        //setUserCartItems(Array.from(new Set(user.cartItems.map(item => item.salesItem.saleId))));
        //setLoadingCart(false);
        //console.log(userCart);
        const response = await axios.post("http://localhost:5006/api/sales/salesByUserCart" , userCart);
        const cartRes = response.data;
        console.log(cartRes);
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-lightRGBA dark:bg-darkRGBA">
        <div className="flex flex-col space-y-10 items-center ">
          <h1 className="font-tagFont text-5xl font-bold">My Carts</h1>
          {!loadingCart && (userCart.length == 0 ? (<span>Here is nothing in your cart.</span>):(<span>You selected the items in the following sales.</span>))}
          {!loadingCart && (cartSale.map((item , index) => (
            <CartSaleCard key={index} name={item.name} endAt={item.endAt}/>
          )))}
          {isLoggedIn && (<button onClick={testButton}>test</button>)}
        </div>
      </main>
    );
  }