import { AuthContext } from "@/context/AuthContext";
import { db } from "@/services/config/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"

export const useGetUserPokedexItems=()=>{
    const[sales, setSales]=useState();
    const[loading, setLoading]=useState(true);
    const {user}=useContext(AuthContext);
    const [error,setError]=useState(false);

    useEffect(()=>{
        const dbCollection=collection(db,'sales');
        const q=query(dbCollection, where('buyerDetails.uid','==',user.uid));
        const pokedexItems=[];
        getDocs(q).then((snapshot)=>{
            const data=snapshot.docs.map((doc)=>({id:doc.id, ...doc.data()}));
            data.forEach((doc)=>{
                doc.items.forEach((item)=>{
                    if(!pokedexItems.find((i)=>i.uid===item.uid)){
                        pokedexItems.push(item)
                    }
                })
            })
            setSales(pokedexItems);
        })
        .catch((e)=>{
            console.error(e);
            setError(true);
        })
            .finally(()=>setLoading(false))
    },[user])

    return {loading, sales, error}
}