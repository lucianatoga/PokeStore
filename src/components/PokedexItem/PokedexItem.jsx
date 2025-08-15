import { Box, Flex } from "@chakra-ui/react";
import './PokedexItem.css'
import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const PokedexItem=({items})=>{
    const [n, setN]=useState(0);
    return(
        <Box width={'100%'}>
            <Flex className="pokedex-container">
                <Flex className="carrousel">
                    <div className="carrusel-img"><img src={`${items[n].img}`}/></div>
                    <div>
                        <button onClick={()=>setN((prevN)=>prevN-1)} className={n===0 ? 'grayed-out-btn' : ''}><MdNavigateBefore size={'1.3rem'}/></button>
                        <button onClick={()=>setN((prevN)=>prevN+1)} className={n===items.length-1 ? 'grayed-out-btn' : ''}><MdNavigateNext size={'1.3rem'}/></button>
                    </div>
                </Flex>
                <p>no. {items[n].id}</p>
            </Flex>
        </Box>
    )
}

export default PokedexItem;
