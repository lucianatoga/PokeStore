import {Button, Flex } from '@chakra-ui/react'
import './Cards.css'
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const BerryCard=({item})=>{
    const {addToCart}=useContext(CartContext);
    return(
        <Flex className='card-container'>
            <Flex className='detail-card berry'>
                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} Berry</p>
                <img src={item.img}/>
            </Flex>
            <Button color onClick={()=>addToCart({item})}>Add to cart</Button>
        </Flex>
    )
}
export default BerryCard;