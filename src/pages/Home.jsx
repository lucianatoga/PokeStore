import { Box, Flex } from "@chakra-ui/react";
import Cover from "@/components/Cover/Cover";
import { useEffect, useState } from "react";
import { getBerries, getPokemons } from "@/services/pokeapi.service";
import CardsPreview from "@/components/CardsDisplay/CardsPreview";
import LoadingCircle from "@/components/LoadingCircle/LoadingCircle";

const Home=()=>{
    const [pokemons, setPokemons]=useState([]);
    const [berries, setBerries]=useState([]);
    const [loadingPokemons, setLoadingPokemons]=useState(true);
    const [loadingBerries, setLoadingBerries]=useState(true);

    useEffect(()=>{        
        const controller=new AbortController();
        getPokemons(12, controller.signal).then((data)=>setPokemons(data || [])).catch((error)=>{console.error(error)}).finally(()=>setLoadingPokemons(false));
        getBerries(12, controller.signal).then((data)=> setBerries(data || [])).catch((error)=>console.error(error)).finally(()=>setLoadingBerries(false));
        return()=>controller.abort();
    },[])
    
    return(
        <Box>
            <Cover/>
            <Flex className="flex-centered">
                {loadingPokemons ? <LoadingCircle/> 
                : <CardsPreview items={pokemons} title={'pokemons'}/>}
            </Flex>
            <Flex className="flex-centered">
                {loadingBerries ? <LoadingCircle/>  : <CardsPreview items={berries} title={'berries'}/>}
            </Flex>
        </Box>
    )
}

export default Home;