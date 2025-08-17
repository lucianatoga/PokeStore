import { Flex } from "@chakra-ui/react"
import './CardsDisplay.css'
import { useNavigate } from "react-router"

const AllCardsDisplay=({items, title})=>{
    const navigate=useNavigate();
    
    return(
            <Flex className="cards-display-container">
                <h1 className="heading">{title}</h1> 
                <Flex className='cards-container'>
                    {items.length>0 ?
                    items.map((item)=>{
                        return(
                            <Flex key={item.id} onClick={()=>navigate(`/${item.type}/${item.id}`)} className={`faced-up-${item.type} listed-card`}>
                                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {item.type ==='berry' ? 'Berry' : ''}</p>
                                <img src={item.img || item.sprites.front_default}/>
                            </Flex>
                        )
                    })
                    :
                    <Flex key={items.id} onClick={()=>navigate(`/${items.type}/${items.id}`)} className={`faced-up-${items.type} listed-card`}>
                        <p>{items.name.charAt(0).toUpperCase() + items.name.slice(1)} {items.type ==='berry' ? 'Berry' : ''}</p>
                        <img src={items.img || items.sprites.front_default}/>
                    </Flex>
                    }
                    
                </Flex>
        </Flex>
    )
}

export default AllCardsDisplay;