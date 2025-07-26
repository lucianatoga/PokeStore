import { Flex } from "@chakra-ui/react"
import './Footer.css'

const Footer=()=>{
    return(
        <Flex className="footer">
            <p>2025</p>
            <p>data from <a target="_blank" href="https://pokeapi.co/">PokéAPI</a></p>
        </Flex>
    )
}
export default Footer;