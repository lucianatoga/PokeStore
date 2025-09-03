import { Flex } from "@chakra-ui/react";
import './SideBar.css'
import pokedex from "../../assets/pokedex-closed.jpg"
import { PiShoppingCartLight } from "react-icons/pi";
import { TfiHome } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "@/context/CartContext";
import SearchItem from "../SearchItem/SearchItem";
import { RiUserAddLine, RiUserFollowLine } from "react-icons/ri";
import { AuthContext } from "@/context/AuthContext";
import UserAuth from "../UserAuth/UserAuth";

const SideBar=()=>{
    const navigate=useNavigate();
    const{pathname}=useLocation()
    const homeBtnRef=useRef();
    const pkdxBtnRef=useRef();
    const {cart}=useContext(CartContext);
    const itemCount=cart.length;
    const {user}=useContext(AuthContext);

    useEffect(()=>{
        pathname==='/' ? homeBtnRef.current.classList.add('no-display') : homeBtnRef.current.classList.remove('no-display');
        user ? pkdxBtnRef.current.classList.remove('no-display') : pkdxBtnRef.current.classList.add('no-display')
    },[pathname, user])

    return(
        <Flex className="sidebar">
            <button onClick={()=>navigate('/')} ref={homeBtnRef} className="floating-btn"><TfiHome size='1.6rem'/></button>
            <button onClick={()=>navigate('/pokedex')} ref={pkdxBtnRef} className="floating-btn"><img src={pokedex}/></button>
            <button onClick={()=>navigate('/cart')} className="floating-btn"><PiShoppingCartLight size='1.8rem'/><p>{itemCount}</p></button>
            <SearchItem>
                <button className="floating-btn"><IoIosSearch size='1.8rem'/></button>
            </SearchItem>
            <UserAuth>
                <button className="floating-btn"><RiUserAddLine size={'1.6rem'}/></button>
            </UserAuth>
            {/* if there's a user, show this icon instead: RiUserFollowLine  */}
            
        </Flex>
    )
}

export default SideBar;