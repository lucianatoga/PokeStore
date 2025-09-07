import BerryCard from "@/components/Cards/BerryCard"
import PokeCard from "@/components/Cards/PokeCard"
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle"
import { getBerryById, getPokemonById } from "@/services/pokeapi.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const CardDetail=()=>{
    const {type,id}=useParams();
    const [item, setItem]=useState();
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        type==='pokemon' ? getPokemonById(id).then((item)=>setItem(item)).catch((e)=>console.error(e)).finally(()=>setLoading(false))
        : getBerryById(id).then((item)=>setItem(item)).catch((e)=>console.error(e)).finally(()=>setLoading(false));
    },[type,id])
    return(
        loading ? <LoadingCircle/> :
        type==='berry'? <BerryCard item={item}/> : <PokeCard item={item}/>
    )
}

export default CardDetail