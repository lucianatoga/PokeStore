# SPA - Pokémon cards web store

## Details
- React + Vite
- JavaScript + SWC
- Firebase DB and Authentication

## Introduction
This application simulates a web store for Pokémon cards. It fetches the data from *PokémonAPI* and displays Pokémons and Berries cards. 

The user can navigate through it, look at the cards and 'buy' them, do a search and register themselves. Additionally, if the user is logged in, they'll be able to see the items they've bought in the pokedex.

### Purchase process:
The application simulates the process by asking the user for some PI and to confirm the purchase, which creates a sale form with the user and products details and registeres it in a *Firestore Database* collection. 
After successfully complete, it returns the purchase ID.

### Authentication:
The application uses *Firebase Authentication* to register users. They can sign up and then log in with an email and password.

If the user is authenticated, their purchases are registered with the userId. This way, if they're logged in, they'll have access to see their pokémons and berries collection in the Pokedex.
