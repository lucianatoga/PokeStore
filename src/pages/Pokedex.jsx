import PokedexItem from "@/components/PokedexItem/PokedexItem"
import RedirectItem from "@/components/Redirect/RedirectItem";
import { useEffect, useMemo, useState } from "react";

const Pokedex=()=>{
    const [pokedex, setPokedex]=useState([]);
    const sales = useMemo(()=>JSON.parse(localStorage.getItem('sales'))||[],[])
    useEffect(()=>{
        const pokedexItems=[];
        sales.forEach(purchase => {
            purchase.items.forEach(item=> {
                if(!pokedexItems.find((i)=>i.id===item.id&&i.type===item.type)){
                    pokedexItems.push({id:item.id, img:item.img, type:item.type})
                }
            })
        });
        setPokedex(pokedexItems);
    },[sales])

    return(
        sales.length===0 ? <RedirectItem message={"You haven't bought any cards."}/>
        : pokedex.length===0 ? <p>loading</p> : <PokedexItem items={pokedex}/>
    )
}

export default Pokedex