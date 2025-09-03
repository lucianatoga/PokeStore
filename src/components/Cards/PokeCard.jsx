import {Button, Flex, Box, Accordion } from '@chakra-ui/react'
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
            <Flex className='item-info'>
                {item.species.evolves_from!=null ? <p><b>Evolves from: </b>{toProperNoun(item.species.evolves_from.name)}</p> : <p></p>}
                <Accordion.Root collapsible>
                    <Accordion.Item>
                        <b>Ability:</b>
                        <Accordion.ItemTrigger>
                            {toProperNoun(item.abilities.name)}
                        <Accordion.ItemIndicator/>
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                        <Accordion.ItemBody>{item.abilities.description}</Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
                {item.held_items!=null ? 
                <Box>
                    <b>Held items:</b> 
                    <Flex><p>{toProperNoun(item.held_items.name)} </p> <img src={item.held_items.sprites.default}/></Flex>
                </Box> 
                : <p></p>}
                <Button variant={'subtle'} onClick={()=>addToCart({item})}>Add to cart</Button>
            </Flex>
            
        </Flex>
    )
}
export default PokeCard