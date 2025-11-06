import {Button, Flex } from '@chakra-ui/react'
import './Cards.css'
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { toProperNoun } from '@/hooks/toProperNoun'; 

const BerryCard=({item})=>{
    const {addToCart}=useContext(CartContext);

    return(
        <Flex className='card-container'>
            <Flex className='detail-card berry'>
                <p>{toProperNoun(item.name)} Berry</p>
                <img src={item.img}/>
            </Flex>
            <Flex className='item-info'>
                <p><b>Growth time: </b>{item.growth_time}</p>
                <p><b>Natural gift power: </b>{item.natural_gift_power}</p>
                <p><b>Firmness: </b>{toProperNoun(item.firmness.name)}</p>
                <p><b>Smoothness: </b>{item.smoothness}</p>
                <p><b>Flavor: </b>{toProperNoun(item.flavors[0].flavor.name)}</p>
                <Button variant={'subtle'} onClick={()=>addToCart({item})}>Add to cart</Button>
            </Flex>
            
        </Flex>
    )
}
export default BerryCard;