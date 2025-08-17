import { Flex } from "@chakra-ui/react"
import './CardsDisplay.css'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

const CardsPreview=({items, title})=>{
    const cardsRef=useRef();
    const [elementVisible, setElementVisible]=useState(false);
    const navigate=useNavigate()
    useEffect(()=>{    
        const observer=new IntersectionObserver((entries)=>{
            setElementVisible(entries[0].isIntersecting)
        })
        observer.observe(cardsRef.current);
    },[])
    return(
            <Flex className="cards-display-container"> 
                <button onClick={()=>navigate(`/${title}`)} className={`expand-button ${elementVisible ? 'fade-in' : ''}`}>{title}</button>

                <Flex ref={cardsRef} className='cards-container'>
                    {items.map((item)=>{
                        const img =item.img || item.sprites.front_default;
                        return(
                            <Flex key={item.id} onClick={()=>navigate(`/${item.type}/${item.id}`)} className={`listed-card faced-down-${item.type} `}>
                                <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)} {item.type ==='berry' ? 'Berry' :''}</p>
                                <img src={img}/>
                            </Flex>
                        )
                    })}
                    
                </Flex>
        </Flex>
    )
}

export default CardsPreview;