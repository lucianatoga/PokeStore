import PokeCard from "@/components/PokeCard/PokeCard"
import { getBerryById, getPokemonById } from "@/services/poke.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

const PokeCardDetail=()=>{
    const {type,id}=useParams();
    const [item, setItem]=useState();
    const [loading, setLoading]=useState(true);
    useEffect(()=>{
        type==='pokemons' ? getPokemonById(id).then((item)=>setItem(item)).catch((e)=>console.error(e)).finally(()=>setLoading(false))
        : getBerryById(id).then((item)=>setItem(item)).catch((e)=>console.error(e)).finally(()=>setLoading(false));
    },[type,id])
    return(
        loading ? <p>loading</p> :
        <PokeCard item={item}/>
    )
}

export default PokeCardDetail