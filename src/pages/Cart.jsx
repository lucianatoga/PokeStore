import CartItem from "@/components/CartItem/CartItem";
import { CartContext } from "@/context/CartContext";
import { Heading } from "@chakra-ui/react";
import { useContext } from "react";

const Cart=()=>{
    const {cart}=useContext(CartContext);

    return(
        cart.length<1 ? <Heading size='xl'>CART IS EMPTY</Heading> : <CartItem/>
    )
}

export default Cart