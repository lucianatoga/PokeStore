import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";


const ThumbnailCard=({item, size})=>{
    const navigate=useNavigate();
    
    return(
        <Flex key={item.id} onClick={()=>navigate(`/${item.type}/${item.id}`)} className={`faced-up-${item.type}-${size} listed-card size-${size}`}>
            <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {item.type ==='berry' ? 'Berry' : ''}</p>
            <img src={item.img}/>
        </Flex>
    )
}

export default ThumbnailCard;