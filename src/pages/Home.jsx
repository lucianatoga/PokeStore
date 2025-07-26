import { Box } from "@chakra-ui/react";
import Cover from "@/components/Cover/Cover";
import CardsDisplay from "@/components/CardsDisplay/CardsDisplay";
import { useEffect, useState } from "react";
import { getBerries, getPokemons } from "@/services/poke.service";

const Home=()=>{
    const [pokemons, setPokemons]=useState([]);
    const [berries, setBerries]=useState([]);

    useEffect(()=>{        
        getPokemons(16).then((data)=>setPokemons(data || [])).catch((error)=>{console.error(error)});
        getBerries(16).then((data)=> setBerries(data || [])).catch((error)=>console.error(error))
    },[])
    return(

        <Box>
            <Cover/>
            <CardsDisplay items={pokemons} title={'pokemons'}/> 
            <CardsDisplay items={berries} title={'berries'}/>
        </Box>
    )
}

export default Home;