import {Button, Flex, Box } from '@chakra-ui/react'
import './Cards.css'
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';
import { toProperNoun } from '@/hooks/toProperNoun';

const PokeCard=({item})=>{
    const {addToCart}=useContext(CartContext);
    return(
        <Flex className='card-container'>
            <Flex className='detail-card pokemon'>
                <p className='pokemon-name'>{toProperNoun(item.name)}</p>
                <img src={item.img}/>
                <div className={`energy-item ${item.types[0].type.name}`}></div>
                <p className='pokemon-move'>{toProperNoun(item.moves[0].move.name)}</p>
            </Flex>
            <Flex className='pokemon-info'>
                    <p>Ability: {toProperNoun(item.abilities.name)} </p>
                    {item.held_items!=null ? 
                    <Box>
                        <p>Held items:</p> 
                        <Flex><p>{toProperNoun(item.held_items.name)} </p> <img src={item.held_items.sprites.default}/></Flex>
                    </Box> 
                    : <p></p>}
                <Button  onClick={()=>addToCart({item})}>Add to cart</Button>
            </Flex>
            
        </Flex>
    )
}
export default PokeCard