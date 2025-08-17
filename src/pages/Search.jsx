import AllCardsDisplay from "@/components/CardsDisplay/AllCardsDisplay"
import { searchItem } from "@/services/poke.service";
import { useEffect, useState } from "react"
import { useParams } from "react-router";

const Search=()=>{
    const [items, setItems]=useState();
    const {key}=useParams();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        searchItem(key).then((data)=>setItems(data)).catch((error)=>console.error(error)).finally(()=>setLoading(false))
    },[key])

    return(
        loading?<p>searching... this can take a while</p>:
        items === undefined ? <p>not found</p> :
        <AllCardsDisplay items={items} title={`results for '${key}'`}/> 
    )
}

export default Search;