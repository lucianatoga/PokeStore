import { Flex} from "@chakra-ui/react";
import './PokedexItem.css'
import { memo, useEffect, useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { useNavigate } from "react-router";
import LoadingCircle from "../LoadingCircle/LoadingCircle";

const PokedexItem=memo(
    function PokedexItem({items}){
        
        const [n, setN]=useState(0);
        const [itemsFiltered, setItemsFiltered]=useState(items);
        const types=Array.from(new Set(items.map((item)=>item.type)));
        const navigate=useNavigate();

        useEffect(() => {
            setItemsFiltered(items);
            setN(0);
        }, [items]);
        
        const handleChange=(e)=>{
            e.target.value==='all' ? setItemsFiltered(items) 
            : setItemsFiltered(items.filter((item)=>item.type===e.target.value));
            setN(0);
        }

        return(
            itemsFiltered.length===0 ? <LoadingCircle/> :
            <Flex width={'100%'} justifyContent={'center'}>
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
            </Flex>
        )
    }
)

export default PokedexItem;
