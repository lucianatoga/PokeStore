
import { BASE_URL } from "./config/api";

export async function getPokemons(limit){
        try{
            //By default, a list "page" will contain up to 20 resources.
            const response = limit == null ? await fetch( `${BASE_URL}pokemon`) : await fetch( `${BASE_URL}pokemon?limit=${limit}`)
            if(!response.ok){
                throw new Error(`response status: ${response.status}`);
            }
            const data = await response.json();
            const pokemons= await Promise.all(data.results.map((pokemon)=>getItem(pokemon.url)))
            //add 'type' property to facilitate further manipulation:
            return pokemons.map((pokemon)=>({...pokemon, type:'pokemon'}));
        }
        catch (error) {
            console.error(error.message);
        }
    
}

export async function getBerries(limit){
    try{
        //By default, a list "page" will contain up to 20 resources.
        const response = limit==null ? await fetch(`${BASE_URL}berry`) : await fetch(`${BASE_URL}berry?limit=${limit}`);
        if(!response.ok){
            throw new Error(`response status: ${response.status}`)
        }
        const data = await response.json();
        const berries=await Promise.all(data.results.map((berry)=> getItem(berry.url)))
        const berriesImg=await Promise.all(berries.map((berry)=>{
            //add 'type' property as well to facilitate further manipulation:
            const berryWithImg=getItem(berry.item.url).then((item)=>({...berry, img: item.sprites.default, type:'berry'})).catch((e)=>console.error(e));
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
        const pokemon=await response.json()
        //add 'type' property to facilitate further manipulation:
        return {...pokemon, type:'pokemon'}
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
        const berryItem = await getItem(berry.item.url);
        //add 'type' property as well to facilitate further manipulation:
        return {...berry, img:berryItem.sprites.default, type:'berry'};
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
        
        const item = await response.json()
        return item;
    }
    catch (error) {
        console.error(error.message);
    }
}

export async function getTypes(){
    try{
        const response= await fetch(`${BASE_URL}/type`);
        if(!response.ok){
            throw new Error(`response status: ${response.status}`)
        } 
        const json =await response.json();
        const types= await Promise.all(json.results.map((type)=>getItem(type.url)));
        console.log(types)
    } 
    catch (error) {
        console.error(error.message);
    }
}