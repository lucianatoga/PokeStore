import { Flex } from "@chakra-ui/react"
import './CardsDisplay.css'
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

const CardsDisplay=({items, title})=>{
    const myRef=useRef();
    const [elementVisible, setElementVisible]=useState(false);
    const navigate=useNavigate()
    useEffect(()=>{    
        const observer=new IntersectionObserver((entries)=>{
            setElementVisible(entries[0].isIntersecting)
        })
        observer.observe(myRef.current);
    },[])
    return(
        
        <Flex ref={myRef} className='cards-container'>
            
            {items.map((item)=>{
                const img =item.img || item.sprites.front_default;
                return(
                    <Flex key={item.id} onClick={()=>navigate(`/${title}/${item.id}`)} className={`${title} card`}>
                        <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                        <img src={img}/>
                    </Flex>
                )
            })}

            <button className={`more-button ${elementVisible ? 'content-hidden' : ''}`}>{title}</button>
        </Flex>

    )
}

export default CardsDisplay;