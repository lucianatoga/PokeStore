import { Flex } from "@chakra-ui/react";
import './SideBar.css'
import pokedex from "../../assets/pokedex-closed.jpg"
import { PiShoppingCartLight } from "react-icons/pi";
import { TfiHome } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "@/context/CartContext";

const SideBar=()=>{
    const navigate=useNavigate();
    const{pathname}=useLocation()
    const homeBtnRef=useRef();
    const {cart}=useContext(CartContext)
    //const itemCount=cart.reduce((count, item)=>count+(item.quantity), 0);
    const itemCount=cart.length;
    useEffect(()=>{
        pathname==='/' ? homeBtnRef.current.classList.add('no-display') : homeBtnRef.current.classList.remove('no-display')
    },[pathname])
    return(
        <Flex className="sidebar">
            <button onClick={()=>navigate('/')} ref={homeBtnRef} className="floating-btn"><TfiHome size='1.6rem'/></button>
            <button onClick={()=>navigate('/pokedex')} className="floating-btn"><img src={pokedex}/></button>
            <button onClick={()=>navigate('/cart')} className="floating-btn"><PiShoppingCartLight size='1.8rem'/><p>{itemCount}</p></button>
            <button onClick={()=>navigate('/cart')} className="floating-btn"><IoIosSearch size='1.8rem'/></button>
        </Flex>
    )
}

export default SideBar;