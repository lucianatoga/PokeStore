import { RouterProvider } from "react-router"
import MainLayout from "./layouts/MainLayout"
import { router } from "./routes"
import { CartProvider } from "./context/CartContext"

function App() {

  return (
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  )
}

export default App
