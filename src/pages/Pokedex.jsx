import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";
import PokedexItem from "@/components/PokedexItem/PokedexItem";
import RedirectItem from "@/components/RedirectItem/RedirectItem";
import { AuthContext } from "@/context/AuthContext";
import { useGetUserPokedexItems } from "@/hooks/useGetUserPokedexItems";
import { Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Pokedex=()=>{
   const [pokedex, setPokedex]=useState([]);
    const {sales, loading, error}=useGetUserPokedexItems();
    const {user}=useContext(AuthContext);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user||error){
            const timer= setTimeout(() => {navigate('/')}, 2500);
            return()=>clearTimeout(timer)
        }
        else if(Array.isArray(sales)){
            try{
                setPokedex(sales);
            }
            catch (error) {
                console.error(error.message);
            }
        }
        
    },[sales, user, error])

    if(loading){
        return (<LoadingCircle/>)
    }
    else if(error){
        return( <Heading >Sorry, an error occurred. Redirecting...</Heading>)
    }
    else if(pokedex.length===0){
        return(<RedirectItem message={"You haven't bought any cards."}/>)
    }
    else{
        return(<PokedexItem items={pokedex}/>)
    }

    // return(
    //     user ?
    //         loading ? <LoadingCircle/> : 
    //             error ? <Heading >Sorry, an error occurred. Redirecting...</Heading>
    //             : pokedex.length===0 ? <RedirectItem message={"You haven't bought any cards."}/>
    //             : <PokedexItem items={pokedex}/>
    //     : <Heading>Please login to view your Pokedex. Redirecting...</Heading>
    // )
}

export default Pokedex