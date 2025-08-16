import { Button, CloseButton, Drawer, Portal, Input } from "@chakra-ui/react"
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const SearchItem = ({children}) => {
    const [search, setSearch]=useState();
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(search)
        //navgate to a page that displays the cards that contain the word searched: (navigate('/search/key-word'))
        //create a page that reders AllCardsDisplay 
        //It'll call a function that will search items that contains the key word (gotten from params) in their name OR
        // call call both functions, getBerries and getPokemons, and filter by the key word
    }
  return (
    <Drawer.Root placement={'top'}>
      <Drawer.Trigger asChild>
        {children}
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content height={'7rem'} >
            <Drawer.Body alignContent={'end'} >
                <form onSubmit={(e)=>handleSubmit(e)} style={{display:'flex',gap:'1rem', margin:'0 2rem 10px 0'}}>
                    <Input type="text" placeholder="type a name" onChange={(e)=>setSearch(e.target.value)}/>
                    <Button variant={'outline'} type="submit"><IoIosSearch/></Button>
                </form>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm"/>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SearchItem;