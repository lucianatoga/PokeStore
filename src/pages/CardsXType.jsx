import AllCardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";
import { getBerries, getPokemons } from "@/services/poke.service"
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

  const CardsXType=()=>{
    const {type}=useParams();
    const [items, setItems]=useState([]);
    const [itemsCount, setItemsCount]=useState(21);
    const [loading, setLoading]=useState(true);
    const [loadingMore, setLoadingMore]=useState(false);
    
    useEffect(()=>{
        type==='berries' ? 
        getBerries(itemsCount).then((data)=>setItems(data||[])).catch((e)=>console.error(e))
        .finally(()=>{ setLoading(false); setLoadingMore(false);}) 
        : getPokemons(itemsCount).then((data)=>setItems(data||[])).catch((e)=>console.error(e))
        .finally(()=>{ setLoading(false); setLoadingMore(false);}) 
    },[type, itemsCount])
    
    return(
      loading ? <LoadingCircle/>:
      <Flex className="flex-centered">
        <AllCardsDisplay items={items} title={type}/>
        {loadingMore ? <LoadingCircle/>
        : <Button className={`${itemsCount>items.length ? 'grayed-out-btn' : ''} red-btn`} onClick={()=>{setItemsCount(itemsCount+21); setLoadingMore(true)}}>Load more</Button>}
      </Flex>
    )
  }

  export default CardsXType;