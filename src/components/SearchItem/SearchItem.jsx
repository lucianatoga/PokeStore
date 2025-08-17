import { Button, CloseButton, Drawer, Portal, Input } from "@chakra-ui/react"
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router";

const SearchItem = ({children}) => {
    const [search, setSearch]=useState();
    const navigate=useNavigate();
    const [open, setOpen]=useState()
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(search!=undefined){
          navigate(`/search/${search}`)
          setOpen(false)
        }
    }

  return (
    <Drawer.Root placement={'top'} open={open} onPointerDownOutside={()=>setOpen(false)}>
      <Drawer.Trigger asChild onClick={()=>setOpen(true)}>
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
              <CloseButton size="sm"  onClick={()=>setOpen(false)}/>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default SearchItem;