import { Box, Button, Heading, Input } from '@chakra-ui/react';
import './CheckoutForm.css'
import { useContext, useState } from 'react';
import { CartContext } from '@/context/CartContext';
import RedirectItem from '../RedirectItem/RedirectItem';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/services/config/firebase';
import { AuthContext } from '@/context/AuthContext';

const CheckoutForm=({setIsFinalized, setSaleId})=>{
    const{cart, setCart}=useContext(CartContext);
    const [error, setError]=useState(false);
    const {user}=useContext(AuthContext);
    const [saleForm, setSaleForm]=useState(
            {
                date:'',
                items:[],
                buyerDetails:{name:'', email:'', phone:'', uid:null}
            }
        );

    useState(()=>{
        if(user){
            setSaleForm((prev)=>({...prev, buyerDetails:{...prev.buyerDetails, uid:user.uid}}))
        }
        setSaleForm((prev)=>({...prev, date:Date.now(), items:cart.map((item)=>
            ({...item, uid:item.type+item.id})
        )}))
    },[])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(saleForm.items.length>=1){
            try{
                const sales=collection(db,'sales');
                addDoc(sales, saleForm).then((doc)=>setSaleId(doc.id)).catch((error)=>console.error(error.message));
                setCart([]);
                setIsFinalized(true);
            }
            catch (error) {
                console.error(error.message);
                setError(true);
                setIsFinalized(true);
            }
        }
    }
    return(
        saleForm.items.length<1 ? <RedirectItem message={"You didn't select any cards"}/> :
        error ? <Heading size={'lg'}>Sorry, it was not possible to complete the purchase.</Heading>  :
        <Box className="checkout-form-container">
            <h1>Fill the form to complete your purchase:</h1>
            <form className="checkout-form" onSubmit={(e)=>handleSubmit(e)}>
                <Input type="text" variant={'subtle'} placeholder='Full Name' onChange={(e)=>setSaleForm((prev)=>({...prev, buyerDetails:{...prev.buyerDetails, name:e.target.value}}))} required/>
                <Input type="email" variant={'subtle'} placeholder='Email' onChange={(e)=>setSaleForm((prev)=>({...prev, buyerDetails:{...prev.buyerDetails, email:e.target.value}}))} required/>
                <Input type="number" variant={'subtle'} placeholder='Phone Number' onChange={(e)=>setSaleForm((prev)=>({...prev, buyerDetails:{...prev.buyerDetails, phone:e.target.value}}))} required/>
                <Button className='blue-btn' type='submit'>Buy</Button>
            </form>
        </Box>
    )
}
export default CheckoutForm;