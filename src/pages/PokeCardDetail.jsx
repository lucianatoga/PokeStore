import BerryCard from "@/components/Cards/BerryCard"
import PokeCard from "@/components/Cards/PokeCard"
import { getBerryById, getPokemonById } from "@/services/poke.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const PokeCardDetail=()=>{
    const {type,id}=useParams();
    const [item, setItem]=useState();
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        type==='pokemon' ? getPokemonById(id).then((item)=>setItem(item)).catch((e)=>console.error(e)).finally(()=>setLoading(false))
        : getBerryById(id).then((item)=>setItem(item)).catch((e)=>console.error(e)).finally(()=>setLoading(false));
    },[type,id])
    return(
        loading ? <p>loading</p> :
        type==='berry'? <BerryCard item={item}/> : <PokeCard item={item}/>
    )
}

export default PokeCardDetail