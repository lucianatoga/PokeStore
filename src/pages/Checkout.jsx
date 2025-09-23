import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { useState } from "react";
import { Flex, Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";

const Checkout=()=>{
    const[isFinalized, setIsFinalized]=useState(false);
    const navigate=useNavigate();
    const [saleId, setSaleId]=useState();
     

    return(
        isFinalized ? 
            saleId ? 
            <Flex className='flex-centered'>
                <div>
                    <Heading>Thank you for your purchase! </Heading>
                    <Heading size={'md'}> Order ID: {saleId}</Heading>
                </div>
                <Button className="blue-btn" onClick={()=>navigate('/pokedex')}>Open Pokédex</Button>
            </Flex>
            : <LoadingCircle/>
        : <CheckoutForm setIsFinalized={setIsFinalized} setSaleId={setSaleId}/>
        
    )
}

export default Checkout;