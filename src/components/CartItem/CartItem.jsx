import { CartContext } from "@/context/CartContext"
import { Button, Flex, Heading } from "@chakra-ui/react"
import { useContext } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import './CartItem.css'
import { useNavigate } from "react-router"

const CartItem=()=>{
    const {cart, getTotalPrice, removeFromCart, reduceQty, incrementQty, changeItemQty}=useContext(CartContext);
    const navigate=useNavigate();
    const totalPrice=getTotalPrice();
    const handleInputChange=(item, qty)=>{
      changeItemQty(item, qty)
    }
    
    return(
        <Flex className="shopping-cart-summary" >
          <Heading size='xl'>CART DETAIL</Heading>
          <table className="items-table">
            <thead>
            <tr>
              <th>CARDS</th>
              <th></th>
              <th>TOTAL</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((item)=>(
              <tr key={item.id}>
                <td>
                  <Flex className='cart-card'>
                    <p>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</p>
                    <img src={item.img || item.sprites.front_default}/>
                  </Flex>
                </td>
                <td>
                  <Flex justifyContent='space-evenly'>
                    <div className="item-details">
                        <b>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</b> 
                        <p>US${item.price} u</p>
                        <div className="qty-input">
                            <button onClick={()=>{reduceQty({item});}}>-</button>
                            <input type="number"  value={item.quantity} onChange={(e)=>handleInputChange({item},parseInt(e.target.value)) }/>
                            <button onClick={()=>{incrementQty({item});}}>+</button>
                        </div>
                    </div>
                    <button onClick={()=>removeFromCart({item})}><RiDeleteBin6Line size='1.3rem'/></button>
                  </Flex>
                </td>
                <td>${item.price*item.quantity}</td>
              </tr>
            ))} 
            </tbody>
            <tfoot>
              <tr><th colSpan={3}>Total: ${totalPrice}</th></tr>
            </tfoot>
          </table>
          <Button className="checkout-btn" onClick={()=>{navigate('/')}}>Checkout</Button>
      </Flex>
    )
}

export default CartItem;