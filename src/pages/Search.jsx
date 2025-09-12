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
    const [error, setError]=useState()

    useEffect(()=>{
        setLoading(true);
        searchItem(key).then((data)=>setItems(data)).catch((error)=>setError(error)).finally(()=>setLoading(false))
    },[key])

    return(
        <Flex className="flex-centered">
            <h1 className="bangers-heading">results for '{key}'</h1>
            {loading ? <LoadingCircle/> :
            items === undefined ? <Heading size='xl'>not found </Heading> : error ? <p>{error}</p> :
            <AllCardsDisplay items={items}/>}
        </Flex>
    )
}

export default Search;