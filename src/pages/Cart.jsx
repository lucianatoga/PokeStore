import CartItem from "@/components/CartItem/CartItem";
import RedirectItem from "@/components/Redirect/RedirectItem";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

const Cart=()=>{
    const {cart}=useContext(CartContext);
    
    return(
        cart.length<1 ? <RedirectItem message={"Your cart is empty."}/> : <CartItem/>
    )
}

export default Cart