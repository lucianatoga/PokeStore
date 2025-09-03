import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "@/services/config/firebase";

export const AuthContext = createContext();

export const AuthProvider=({children})=>{
    const [user, setUser]=useState();

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (user)=>{
            setUser(user);
        })
        return()=>unsubscribe();
    },[])

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}