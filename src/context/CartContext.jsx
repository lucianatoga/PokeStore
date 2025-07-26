import { createContext, useState } from "react";

export const CartContext=createContext();

export const CartProvider=({children})=>{
    const [cart, setCart]=useState([]);
    const addToCart=({item})=>{
        setCart((prevCart)=>{
            if(prevCart.find((i)=>i.id===item.id)){ 
                return(prevCart.map((i)=>i.id===item.id ? {...item, quantity:i.quantity+1} : i))
            } 
             else{
                return([...prevCart, {...item, quantity:1}])
            } 
        })
        console.log(cart)
    }

    return(
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}