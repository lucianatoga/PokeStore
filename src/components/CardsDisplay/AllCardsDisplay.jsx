import { Flex } from "@chakra-ui/react"
import './CardsDisplay.css'
import ThumbnailCard from "../ThumbnailCard.jsx/ThumbnailCard";
import { LuChevronsUp } from "react-icons/lu";
import { memo, useEffect, useState } from "react";

const AllCardsDisplay = memo(
    function AllCardsDisplay({items, title}){
        const [showScrollBtn,setShowScrollBtn]=useState();

        useEffect(()=>{
              window.scrollTo({top:0, left:0, behavior:'smooth'});
              const handleScroll=()=>{
                setShowScrollBtn(window.scrollY>600)
              }
              window.addEventListener('scroll', handleScroll);
              return()=>window.removeEventListener('scroll', handleScroll);
        },[])
        return(
            <Flex className="cards-display-container">
                <h1 className="bangers-heading">{title}</h1> 
                <Flex className='cards-container'>
                    {items.length>0 ?
                    items.map((item)=>{
                        return(
                            <ThumbnailCard key={item.id} item={item} size={'m'}/>
                        )
                    })
                    : <ThumbnailCard key={items.id} item={items} size={'m'}/>}
                </Flex>
                {showScrollBtn && <button className={`floating-btn page-bottom`}  onClick={()=>window.scrollTo({top:0, left:0, behavior:'smooth'})}><LuChevronsUp size={'1.5rem'}/></button>}
            </Flex>
        )
    }
)
export default AllCardsDisplay;