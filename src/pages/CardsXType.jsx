import CardsDisplay from "@/components/CardsDisplay/CardsDisplay"
import { getBerries, getPokemons } from "@/services/poke.service"
import { useEffect, useState } from "react";
import { useParams } from "react-router";

  const CardsXType=()=>{
    const {type}=useParams();
    const [items, setItems]=useState([]);

    useEffect(()=>{
        type==='berries' ? 
        getBerries().then((data)=>setItems(data||[])).catch((e)=>console.error(e)) 
        : getPokemons().then((data)=>setItems(data||[])).catch((e)=>console.error(e))
    },[type])
    
    return(
        <CardsDisplay items={items} title={type} typeOfTitle={'heading'}/>
    )
  }

  export default CardsXType;