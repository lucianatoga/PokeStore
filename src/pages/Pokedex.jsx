import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";
import PokedexItem from "@/components/PokedexItem/PokedexItem"
import RedirectItem from "@/components/RedirectItem/RedirectItem";
import { AuthContext } from "@/context/AuthContext";
import { Box, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

const Pokedex=()=>{
    const [pokedex, setPokedex]=useState([]);
    const sales = useMemo(()=>JSON.parse(localStorage.getItem('sales'))||[],[]);
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user){
            setTimeout(() => {
            navigate('/');
            }, 2000);
        }
        const pokedexItems=[];
        sales.forEach(purchase => {
            purchase.items.forEach(item=> {
                if(!pokedexItems.find((i)=>i.id===item.id&&i.type===item.type)){
                    pokedexItems.push({id:item.id, img:item.img, type:item.type})
                }
            })
        });
        setPokedex(pokedexItems);
    },[sales, user])

    return(
        user ?
        sales.length===0 ? <RedirectItem message={"You haven't bought any cards."}/>
        : pokedex.length===0 ? <LoadingCircle/> : <PokedexItem items={pokedex}/>
        : <Heading size={'lg'}>You don't have access. Redirecting...</Heading>
    )
}

export default Pokedex