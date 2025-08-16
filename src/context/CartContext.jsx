import { createContext, useState } from "react";

export const CartContext=createContext();

export const CartProvider=({children})=>{
    const [cart, setCart]=useState([]);

    const addToCart=({item})=>{
        setCart((prevCart)=>{
            if(prevCart.find((i)=>i.id===item.id && i.type===item.type)){ 
                return(prevCart.map((i)=>i.id===item.id && i.type===item.type ? {...i, quantity:i.quantity+1, price:100} : i))
            } 
             else{
                return([...prevCart, {...item, quantity:1, price:100}])
            } 
        })
    }

    const removeFromCart=({item})=>{
        setCart((prevCart)=>
            prevCart.filter((i)=>i.id!==item.id || i.id===item.id && i.type!==item.type))
    }
    const reduceQty=({item})=>{
        if(item.quantity===1){
            removeFromCart({item})
        }
        else{
            setCart((prevCart)=>{
                return prevCart.map((i)=> i.id===item.id && i.type===item.type ? {...i, quantity:i.quantity-1} : i)
            })
        }
    }
    const incrementQty=({item})=>{
        setCart((prevCart)=>prevCart.map((i)=>i.id===item.id && i.type===item.type ? {...i, quantity: i.quantity+1} : i))
    }

    const changeItemQty=({item}, qty)=>{
        setCart((prevCart)=> prevCart.map((i)=>i.id===item.id && i.type===item.type ? {...i, quantity: parseInt(qty)} : i))
    }

    const getTotalPrice=()=>{
        return cart.reduce((count, item)=> count+(item.quantity*item.price),0)
    }

    return(
        <CartContext.Provider value={{cart, setCart, addToCart, getTotalPrice, removeFromCart, reduceQty, incrementQty, changeItemQty}}>
            {children}
        </CartContext.Provider>
    )
}