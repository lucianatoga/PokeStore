import { RouterProvider } from "react-router"
import MainLayout from "./layouts/MainLayout"
import { router } from "./routes"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router}/>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
