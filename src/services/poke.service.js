
import { BASE_URL } from "./config/api";

export async function getPokemons(n){
        try{
            const response = n == null ? await fetch( `${BASE_URL}pokemon`) : await fetch( `${BASE_URL}pokemon?limit=${n}`)
            if(!response.ok){
                throw new Error(`response status: ${response.status}`);
            }
            const data = await response.json();
            const pokemons= await Promise.all(data.results.map((pokemon)=>getItem(pokemon.url)))
            return pokemons;
        }
        catch (error) {
            console.error(error.message);
        }
    
}

export async function getItem(url){
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`response status: ${response.status}`);
        }
        
        const pokemon = await response.json()
        return pokemon;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function getBerries(n){
    try{
        const response = n==null ? await fetch(`${BASE_URL}berry`) : await fetch(`${BASE_URL}berry?limit=${n}`);
        if(!response.ok){
            throw new Error(`response status: ${response.status}`)
        }
        const data = await response.json();
        const berries=await Promise.all(data.results.map((berry)=> getItem(berry.url)))
        const berriesImg=await Promise.all(berries.map((berry)=>{
            const berryWithImg=getItem(berry.item.url).then((item)=>({...berry, img: item.sprites.default})).catch((e)=>console.error(e));
            return berryWithImg
        }))
        return berriesImg
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function getPokemonById(id){
    try{
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        if(!response.ok){
            throw new Error(`response status: ${response.status}`)
        } 
        return await response.json()
    }
    catch (error) {
        console.error(error.message);
    }
}
export async function getBerryById(id){
    try{
        const response = await fetch(`${BASE_URL}/berry/${id}`);
        if(!response.ok){
            throw new Error(`response status: ${response.status}`)
        } 
        const berry= await response.json();
        const berryItem = await getItem(berry.item.url)
        return {...berry, img:berryItem.sprites.default};
    }
    catch (error) {
        console.error(error.message);
    }
}
