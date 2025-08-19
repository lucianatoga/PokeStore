import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { useState } from "react";
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Checkout=()=>{
    const[isFinalized, setIsFinalized]=useState(false);
    const navigate=useNavigate();
    const{ cart}=useContext(CartContext);
    const [saleForm, setSaleForm]=useState(
        {
            purchaseId:'',
            items:[],
            buyerDetails:{name:'', email:'', phone:''}
        }
    );
    useState(()=>{
        setSaleForm((prevSaleForm)=>({...prevSaleForm, purchaseId:Date.now(), items:cart.map((item)=>
            ({id:item.id, name:item.name, qty:item.quantity, price:item.price, img:item.img||item.sprites.front_default, type:item.type})
        )}))
    })
    
    return(
        isFinalized ? 
        <Flex className='flex-centered'>
            <h1>Thank you for your purchase! Order ID: {saleForm.purchaseId} </h1>
            <Button className="blue-btn" onClick={()=>navigate('/pokedex')}>Open Pokédex</Button>
        </Flex>
        : <CheckoutForm setIsFinalized={setIsFinalized} saleForm={saleForm} setSaleForm={setSaleForm}/>
        
    )
}

export default Checkout;