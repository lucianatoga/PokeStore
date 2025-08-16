import { Box, Flex } from "@chakra-ui/react";
import './PokedexItem.css'
import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const PokedexItem=({items})=>{
    const [n, setN]=useState(0);
    const [itemsFiltered, setItemsFiltered]=useState(items);
    const handleChange=(e)=>{
        e.target.value==='all' ? setItemsFiltered(items) 
        : setItemsFiltered(items.filter((item)=>item.type===e.target.value))
    }
    return(
        <Box width={'100%'}>
            <Flex className="pokedex-container">
                    <select id='pokedex-filter' onChange={(e)=>handleChange(e)}>
                        <option>all</option>
                        <option>berry</option>
                        <option>pokemon</option>
                    </select>
                <Flex className="carrousel">
                    <div className="img-container"><img src={`${itemsFiltered[n].img}`}/></div>
                    <div>
                        <button onClick={()=>setN((prevN)=>prevN-1)} className={n===0 ? 'grayed-out-btn' : ''}><MdNavigateBefore size={'1.3rem'}/></button>
                        <button onClick={()=>setN((prevN)=>prevN+1)} className={n===itemsFiltered.length-1 ? 'grayed-out-btn' : ''}><MdNavigateNext size={'1.3rem'}/></button>
                    </div>
                </Flex>
                <p>no. {itemsFiltered[n].id}</p>
            </Flex>
        </Box>
    )
}

export default PokedexItem;
