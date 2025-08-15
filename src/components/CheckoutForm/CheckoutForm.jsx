import { Box, Button, Heading, Input } from '@chakra-ui/react';
import './CheckoutForm.css'
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const CheckoutForm=({setIsFinalized, saleForm, setSaleForm})=>{
    const{ setCart}=useContext(CartContext);
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        try{
            const sales=JSON.parse(localStorage.getItem('sales'))||[];
            sales.push({...saleForm, purchaseId:Date.now()});
            localStorage.setItem('sales', JSON.stringify(sales));
            setCart([]);
            setIsFinalized(true);
        }
        catch (error) {
            console.error(error.message);
        }

    }

    return(
        <Box className="checkout-form-container">
            <h1>Fill the form to complete your purchase:</h1>
            <form className="checkout-form" onSubmit={(e)=>handleSubmit(e)}>
                <Input type="text" variant={'subtle'} placeholder='Full Name' onChange={(e)=>setSaleForm((prevForm)=>({...prevForm, buyerDetails:{name:e.target.value}}))}/>
                <Input type="email" variant={'subtle'} placeholder='Email' onChange={(e)=>setSaleForm((prevForm)=>({...prevForm, buyerDetails:{email:e.target.value}}))}/>
                <Input type="number" variant={'subtle'} placeholder='Phone Number' onChange={(e)=>setSaleForm((prevForm)=>({...prevForm, buyerDetails:{phone:e.target.value}}))}/>
                <Button className='blue-btn' type='submit'>Buy</Button>
            </form>
        </Box>
    )
}
export default CheckoutForm;