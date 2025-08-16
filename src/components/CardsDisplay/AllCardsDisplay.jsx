import { Flex } from "@chakra-ui/react"
import './CardsDisplay.css'
import { useNavigate } from "react-router"

const CardsDisplay=({items, title})=>{
    const navigate=useNavigate();
    return(
            <Flex className="cards-display-container">
                <h1 className="heading">{title}</h1> 
                <Flex className='cards-container'>
                    {items.map((item)=>{
                        const img =item.img || item.sprites.front_default;
                        return(
                            <Flex key={item.id} onClick={()=>navigate(`/${title}/${item.id}`)} className={`faced-up-${title} listed-card`}>
                                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {title ==='berries'? 'Berry' :''}</p>
                                <img src={img}/>
                            </Flex>
                        )
                    })}
                    
                </Flex>
        </Flex>
    )
}

export default CardsDisplay;