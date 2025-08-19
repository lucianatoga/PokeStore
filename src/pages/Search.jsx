import AllCardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";
import { searchItem } from "@/services/poke.service";
import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { useParams } from "react-router";

const Search=()=>{
    const [items, setItems]=useState();
    const {key}=useParams();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        setLoading(true);
        searchItem(key).then((data)=>setItems(data)).catch((error)=>console.error(error)).finally(()=>setLoading(false))
    },[key])

    return(
        <Flex className="flex-centered">
            <h1 className="heading">results for '{key}'</h1>
            {loading ? <LoadingCircle/> :
            items === undefined ? <Heading size='xl'>not found</Heading> :
            <AllCardsDisplay items={items}/>}
        </Flex>
    )
}

export default Search;