import { BASE_URL } from "./config/api";

export async function getPokemons(limit){
        try{
            //By default, a list "page" will contain up to 20 resources.
            const response = limit==null ? await fetch( `${BASE_URL}pokemon`) : await fetch( `${BASE_URL}pokemon?limit=${limit}`);
            if(!response.ok){
                throw new Error(`response status: ${response.status}`);
            }
            const data = await response.json();
            const pokemons= await Promise.all(data.results.map((pokemon)=>getItem(pokemon.url)))
            //add 'type' property to facilitate further manipulation:
            return pokemons.map((pokemon)=>({...pokemon, img:pokemon.sprites.front_default, type:'pokemon'}));
        }
        catch (error) {
            console.error(error.message);
            return error.message;
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
        return error.message;
    }
}

export async function getPokemonById(id){
    try{
        const response = await fetch(`${BASE_URL}/pokemon/${id}`);
        if(!response.ok){
            throw new Error(response.status);
        } 
        const pokemon=await response.json();
        const held_item=pokemon.held_items.length>0 ? await getItem(pokemon.held_items[0].item.url) : null;
        const ability=await getItem(pokemon.abilities[0].ability.url);
        const ability_desc=(ability.effect_entries.filter((entry)=>entry.language.name==='en'))[0].effect||'';
        const species=await getItem(pokemon.species.url);
        //add 'type' property to facilitate further manipulation:
        return {...pokemon, img:pokemon.sprites.front_default, held_items:held_item, abilities:{id:ability.id, name:ability.name, description:ability_desc}, species:{...pokemon.species, evolves_from:species.evolves_from_species}, type:'pokemon'}
    }
    catch (error) {
        console.log(error.message);
        return error.message;
    }
}
{/* getAbility(pokemon.abilities[0].ability.url)=>ability.id, name, effect_entries[0].effect
    getItem(pokemon.held_items[0].item.url)=>item.id, name, sprites.default
*/}
export async function getBerryById(id){
    try{
        const response = await fetch(`${BASE_URL}/berry/${id}`);
        if(!response.ok){
            throw new Error(response.status)
        } 
        const berry= await response.json();
        const berryItem = await getItem(berry.item.url);
        //add 'type' property as well to facilitate further manipulation:
        return {...berry, img:berryItem.sprites.default, type:'berry'};
    }
    catch (error) {
        console.log(error.message);
        return error.message;
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

export async function searchItem(key){
        try{
            //search individually in case the key provided is an exact match
            let pokemon = await getPokemonById(key);
            if (pokemon !== '404') return pokemon;

            let berry = await getBerryById(key);
            if (berry !== '404') return berry;

            //search bewtween berries
            const berries = await getBerries(100); //there are less than 100 berries
            let berriesFound=[];
            for (let item of berries){
                if (item.name.includes(key)){
                    berriesFound.push(item);
                }
            }
            if(berriesFound.length>0) return berriesFound;

            //search between pokemons in batches
            const pokemons= await getPokemons(600);
            let pokemonsFound=[];
            for( let item of pokemons){
                if(item.name.includes(key)){
                    pokemonsFound.push(item);
                }
            }
            if(pokemonsFound.length>0) return pokemonsFound;
            
            //if there's no match at all
            return undefined;
        }
        catch (error) {
            return(error.message);
            //return undefined;
        }
    }