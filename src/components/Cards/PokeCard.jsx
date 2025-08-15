import {Button, Flex } from '@chakra-ui/react'
import './Cards.css'
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

const PokeCard=({item})=>{
    const {addToCart}=useContext(CartContext);
    const img = item.sprites.front_default;
    return(
        <Flex className='card-container'>
            <Flex className='detail-card pokemon'>
                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                <img src={img}/>
                <div className={`energy-item ${item.types[0].type.name}`}></div>
            </Flex>
            <Button colorPalette={'gray'} onClick={()=>addToCart({item})}>Add to cart</Button>
        </Flex>
    )
}
export default PokeCard