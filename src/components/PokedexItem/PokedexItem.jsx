import { Box, Flex} from "@chakra-ui/react";
import './PokedexItem.css'
import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router";

const PokedexItem=({items})=>{
    const [n, setN]=useState(0);
    const [itemsFiltered, setItemsFiltered]=useState(items);
    const types=Array.from(new Set(items.map((item)=>item.type)));
    const navigate=useNavigate();
    const handleChange=(e)=>{
        e.target.value==='all' ? setItemsFiltered(items) 
        : setItemsFiltered(items.filter((item)=>item.type===e.target.value));
        setN(0);
    }

    return(
        <Box width={'100%'}>
            <Flex className="pokedex-container">
                    <select id='pokedex-filter' className="pokedex-filter" onChange={(e)=>handleChange(e)}>
                        <option value='all'>all</option>
                        {types.map((type)=><option key={type} value={type}>{type}</option>
                        )}
                    </select>
                <Flex className="carrousel">
                    <div className="img-container"><img src={`${itemsFiltered[n].img}`} onClick={()=>navigate(`/${itemsFiltered[n].type}/${itemsFiltered[n].id}`)}/></div>
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
