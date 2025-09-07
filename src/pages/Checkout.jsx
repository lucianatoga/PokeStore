import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { useState } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";

const Checkout=()=>{
    const[isFinalized, setIsFinalized]=useState(false);
    const navigate=useNavigate();
    const [saleId, setSaleId]=useState();
    const [error, setError]=useState(false); 

    return(
        isFinalized ? 
        saleId ? 
        <Flex className='flex-centered'>
            <h1>Thank you for your purchase! Order ID: {saleId} </h1>
            <Button className="blue-btn" onClick={()=>navigate('/pokedex')}>Open Pokédex</Button>
        </Flex>
        : error ? <Heading size={'lg'}>Sorry, it was not possible to complete the purchase.</Heading> : <LoadingCircle/>
        : <CheckoutForm setIsFinalized={setIsFinalized} setSaleId={setSaleId} setError={setError}/>
        
    )
}

export default Checkout;