import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import './RedirectItem.css'

const RedirectItem=({message})=>{
    const navigate=useNavigate();

    return(
        <Flex className="redirect-item">
            <Heading >{message.toUpperCase()}</Heading> 
            <Flex className="btns-container">
            <Button className="red-btn" onClick={()=>navigate('/berries')}>Buy Berries</Button>
            <Button className="blue-btn" onClick={()=>navigate('/pokemons')}>Buy Pokemons</Button> 
            </Flex>
        </Flex>
    )
}

export default RedirectItem;