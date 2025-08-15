import CardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import { getBerries, getPokemons } from "@/services/poke.service"
import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

  const CardsXType=()=>{
    const {type}=useParams();
    const [items, setItems]=useState([]);
    const [itemsCount, setItemsCount]=useState(21);
    const[loading, setLoading]=useState(true)
    useEffect(()=>{
        type==='berries' ? 
        getBerries(itemsCount).then((data)=>setItems(data||[])).catch((e)=>console.error(e)).finally(()=>setLoading(false)) 
        : getPokemons(itemsCount).then((data)=>setItems(data||[])).catch((e)=>console.error(e)).finally(()=>setLoading(false)) 
    },[type, itemsCount])
    
    return(
      loading ? <p>loading</p> :
      <Box>
        <CardsDisplay items={items} title={type}/>
        <Button variant='surface' onClick={()=>setItemsCount(itemsCount+21)}>Load more</Button>
      </Box>
    )
  }

  export default CardsXType;