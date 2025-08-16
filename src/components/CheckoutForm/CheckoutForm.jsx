import { Box, Button, Heading, Input } from '@chakra-ui/react';
import './CheckoutForm.css'
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import RedirectItem from '../Redirect/RedirectItem';

const CheckoutForm=({setIsFinalized, saleForm, setSaleForm})=>{
    const{ setCart}=useContext(CartContext);
    const [error, setError]=useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault();
        try{
            if(saleForm.items.length>1){
                const sales=JSON.parse(localStorage.getItem('sales'))||[];
                sales.push(saleForm);
                localStorage.setItem('sales', JSON.stringify(sales));
                setCart([]);
                setIsFinalized(true);
            }
            else{
                setError(true)
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    return(
        error ? <RedirectItem message={"You didn't select any cards"}/> :
        <Box className="checkout-form-container">
            <h1>Fill the form to complete your purchase:</h1>
            <form className="checkout-form" onSubmit={(e)=>handleSubmit(e)}>
                <Input type="text" variant={'subtle'} placeholder='Full Name' onChange={(e)=>setSaleForm((prevForm)=>({...prevForm, buyerDetails:{...prevForm.buyerDetails, name:e.target.value}}))}/>
                <Input type="email" variant={'subtle'} placeholder='Email' onChange={(e)=>setSaleForm((prevForm)=>({...prevForm, buyerDetails:{...prevForm.buyerDetails, email:e.target.value}}))}/>
                <Input type="number" variant={'subtle'} placeholder='Phone Number' onChange={(e)=>setSaleForm((prevForm)=>({...prevForm, buyerDetails:{...prevForm.buyerDetails, phone:e.target.value}}))}/>
                <Button className='blue-btn' type='submit'>Buy</Button>
            </form>
        </Box>
    )
}
export default CheckoutForm;