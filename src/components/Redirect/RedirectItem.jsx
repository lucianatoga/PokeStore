import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import './RedirectItem.css'

const RedirectItem=({message})=>{
    const navigate=useNavigate();

    return(
        <Flex className="redirect-item">
            <h1>{message}</h1> 
            <div>
            <Button className="red-btn" onClick={()=>navigate('/berries')}>Buy Berries</Button>
            <Button className="blue-btn" onClick={()=>navigate('/pokemons')}>Buy Pokemons</Button> 
            </div>
        </Flex>
    )
}

export default RedirectItem;