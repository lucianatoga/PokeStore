import { Box } from "@chakra-ui/react";
import Cover from "@/components/Cover/Cover";
import { useEffect, useState } from "react";
import { getBerries, getPokemons } from "@/services/poke.service";
import CardsPreview from "@/components/CardsDisplay/CardsPreview";

const Home=()=>{
    const [pokemons, setPokemons]=useState([]);
    const [berries, setBerries]=useState([]);
  
    useEffect(()=>{        
        getPokemons(14).then((data)=>setPokemons(data || [])).catch((error)=>{console.error(error)});
        getBerries(14).then((data)=> setBerries(data || [])).catch((error)=>console.error(error));
    },[])
    return(

        <Box>
            <Cover/>
            <CardsPreview items={pokemons} title={'pokemons'}/>
            <CardsPreview items={berries} title={'berries'}/>
        </Box>
    )
}

export default Home;