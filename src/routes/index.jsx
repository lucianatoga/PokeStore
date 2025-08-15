import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import Pokedex from "@/pages/Pokedex";
import Cart from "@/pages/Cart";
import PokeCardDetail from "@/pages/PokeCardDetail";
import CardsXType from "@/pages/CardsXType";
import Checkout from "@/pages/Checkout";

const routes = [
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/pokedex',
                element:<Pokedex/>
            },
            {
                path:'/cart',
                element:<Cart/>
            },
            {
                path:'/:type/:id',
                element:<PokeCardDetail/>
            },
            {
                path:'/:type',
                element:<CardsXType/>
            },
            {
                path:'/checkout',
                element:<Checkout/>
            }
        ]
    }
]

export const router=createBrowserRouter(routes)