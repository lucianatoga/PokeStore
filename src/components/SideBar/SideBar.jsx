import { Flex } from "@chakra-ui/react";
import './SideBar.css'
import pokedex from "../../assets/pokedex-closed.jpg"
import { PiShoppingCartLight } from "react-icons/pi";
import { TfiHome } from "react-icons/tfi";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useRef } from "react";

const SideBar=()=>{
    const navigate=useNavigate();
    const{pathname}=useLocation()
    const homeBtnRef=useRef();
    useEffect(()=>{
        pathname==='/' ? homeBtnRef.current.classList.add('no-display') : homeBtnRef.current.classList.remove('no-display')
    },[pathname])
    return(
        <Flex className="sidebar">
            <button onClick={()=>navigate('/')} ref={homeBtnRef} className="floating-btn"><TfiHome size='1.6rem'/></button>
            <button onClick={()=>navigate('/pokedex')} className="floating-btn"><img src={pokedex}/></button>
            <button onClick={()=>navigate('/cart')} className="floating-btn"><PiShoppingCartLight size='1.8rem'/></button>
        </Flex>
    )
}

export default SideBar;