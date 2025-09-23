import AllCardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";
import { searchItem } from "@/services/pokeapi.service";
import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { useParams } from "react-router";

const Search=()=>{
    const [items, setItems]=useState();
    const {key}=useParams();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const controller =new AbortController();
        setLoading(true);
        searchItem(key, controller.signal).then((data)=>setItems(data)).catch((error)=>console.error(error)).finally(()=>setLoading(false))
        return()=>controller.abort()
    },[key])

    return(
        <Flex className="flex-centered">
            <h1 className="bangers-heading">results for '{key}'</h1>
            {loading ? <LoadingCircle/> :
            items === undefined ? <Heading size='xl'>not found</Heading> : <AllCardsDisplay items={items}/>}
        </Flex>
    )
}

export default Search;