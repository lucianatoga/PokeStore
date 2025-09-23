import { Flex } from "@chakra-ui/react"
import './CardsDisplay.css'
import ThumbnailCard from "../ThumbnailCard.jsx/ThumbnailCard";
import React from "react";

const AllCardsDisplay = React.memo(
    function AllCardsDisplay({items, title}){
        
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
                        :
                        <ThumbnailCard key={items.id} item={items} size={'m'}/>
                        }
                        
                    </Flex>
            </Flex>
        )
    }
)
export default AllCardsDisplay;