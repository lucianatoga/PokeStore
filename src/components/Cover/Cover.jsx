import { Image, Box } from "@chakra-ui/react";
import logo from '../../assets/pokemon.png';
import './Cover.css'

const Cover=()=>{
    return(
        <Box className="cover">
            <Image src={logo} className="logo"/>
        </Box>
    )
}

export default Cover;