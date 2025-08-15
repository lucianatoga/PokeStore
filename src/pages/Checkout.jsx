import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { useState } from "react";
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const Checkout=()=>{
    const[isFinalized, setIsFinalized]=useState(false);
    const{ cart}=useContext(CartContext);
    const [saleForm, setSaleForm]=useState(
        {
            purchaseId:'',
            items:[],
            buyerDetails:{name:'', email:'', phone:''}
        }
    );
    
    useState(()=>{
        setSaleForm((prevSaleForm)=>({...prevSaleForm, items:cart.map((item)=>({id:item.id, name:item.name, qty:item.quantity, price:item.price, img:item.img||item.sprites.front_default}))}))
    })
    
    return(
        isFinalized ? <h1>Thank you for your purchase</h1> :
        <CheckoutForm setIsFinalized={setIsFinalized} saleForm={saleForm} setSaleForm={setSaleForm}/>
        
    )
}

export default Checkout;