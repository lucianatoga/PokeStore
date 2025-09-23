import AllCardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";
import { getBerries, getPokemons } from "@/services/pokeapi.service"
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

  const CardsXType=()=>{
    const {type}=useParams();
    const [items, setItems]=useState([]);
    const [itemsCount, setItemsCount]=useState(20);
    const [loading, setLoading]=useState(true);
    const [loadingMore, setLoadingMore]=useState(false);
    
    useEffect(()=>{
      const controller= new AbortController();
        if(type==='berries'){
          getBerries(itemsCount, controller.signal).then((data)=>setItems(data||[])).catch((e)=>console.error(e))
          .finally(()=>{ 
            setLoading(false); 
            setLoadingMore(false)
          }) 
        }
        else{
          getPokemons(itemsCount, controller.signal).then((data)=>setItems(data||[])).catch((e)=>console.error(e))
          .finally(()=>{ 
            setLoading(false); 
            setLoadingMore(false);
          }) 
        }
        return()=>controller.abort();
    },[type, itemsCount])
        
    const handleClick=()=>{
      setItemsCount(itemsCount+20); 
      setLoadingMore(true);
    }
    
    return(
      loading ? <LoadingCircle/>:
      <Flex className="flex-centered">
        <AllCardsDisplay items={items} title={type}/>
        {loadingMore ? <LoadingCircle/>
        : <Button className={`${itemsCount>items.length ? 'grayed-out-btn' : ''} red-btn`} onClick={()=>handleClick()}>Load more</Button>}
      </Flex>
    )
  }

  export default CardsXType;