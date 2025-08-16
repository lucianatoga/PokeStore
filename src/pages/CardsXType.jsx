import AllCardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import { getBerries, getPokemons } from "@/services/poke.service"
import { Button, Flex } from "@chakra-ui/react";
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
      <Flex className="flex-centered">
        <AllCardsDisplay items={items} title={type}/>
        <Button className="red-btn" onClick={()=>setItemsCount(itemsCount+21)}>Load more</Button>
      </Flex>
    )
  }

  export default CardsXType;