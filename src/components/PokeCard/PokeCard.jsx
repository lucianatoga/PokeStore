import {Button, Flex } from '@chakra-ui/react'
import './PokeCard.css'
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const PokeCard=({item})=>{
    const {addToCart}=useContext(CartContext);
    const img = item.img || item.sprites.front_default;
    return(
        <Flex className='card-container'>
            <Flex className='detail-card'>
                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                <img src={img}/>
            </Flex>
            <Button onClick={()=>addToCart({item})}>Add to cart</Button>
        </Flex>
    )
}
export default PokeCard