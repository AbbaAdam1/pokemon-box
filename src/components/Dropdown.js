import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dropdown = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        setPokemonList(response.data.results);
        //console.error('api');
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);


//step 1, handoff from pokdemondata
const handleSelect = async (e) => {
  const selectedPokemonName = e.target.value;

  //PASS PROPS AS YOU DID BEFORE

  try {
    //selects pokemon and passes pokemon/species data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`);
    const pokemonData = response.data; //pokemon api data
    const speciesData = speciesResponse.data; //species api data

    // Now you have the pokemonData, match it to your pokedex table on the client side
    try {
      //const { data, error } = await supabase
      //      .from('pokedex') //good
      //      .select('pokemon') //not sure
      //      .eq('user_id', user_id); // good

      //this is to get the name. you can probably just get the name from pokemonData so probably not necessary
      //CURRENTLY HERE FIND A WAY TO GET THE POKEMON'S NAME FROM POKEMONDATA VARIABLE. after that uimplement the insert from addtouser
      const pokedexResponse = await axios.get(`http://localhost:3000/get-pokemon-by-name/${selectedPokemonName}`);
      const matchedPokemon = pokedexResponse.data[0]; // Assuming there's only one match

      // Pass the matchedPokemon to the parent component (App.js)
      props.onSelect({ pokemonData, matchedPokemon, speciesData });
      addToUserCollection(matchedPokemon, pokemonData, speciesData);
    } catch (error) {
      console.error('Error fetching Pokemon data from pokedex:', error);
    }
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
  setShowDropdown(false);

  //add pokemon to collection
  //addToUserCollection(matchedPokemon, pokemonData, speciesData);
};

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
////////////////////////////////////////////////////////////////////////////////////////////
//this is what gets all the pokemon and displays it. happens immediately
/*
useEffect(() => {
    const fetchUserPokemonData = async () => {
      try {
        //setLoading1(true);
        //this is what gets all the users pokemon and displays it
        //const response = await axios.get(`http://localhost:3000/api/getUserPokemon/${userId}`);
        const response = await axios.get('https://dpnjftjxqogingjrhdoi.supabase.co/rest/v1/user_pokemon/getUserPokemon/${userId}');

        const userPokemonNames = response.data;

        // Create empty arrays to store Pokemon data and species data
        const fetchedPokemonData = [];
        const fetchedSpeciesData = [];

        // Assuming userPokemonNames is an array
        for (const pokemonName of userPokemonNames) {
          try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            const pokemonData = response.data;
            const speciesData = speciesResponse.data;

            // Add the data to respective arrays
            fetchedPokemonData.push(pokemonData);
            fetchedSpeciesData.push(speciesData);
          } catch (error) {
            console.error('Error fetching Pokémon data:', error);
          }
        }

        // Update state with the accumulated data
        setUserPokemon(fetchedPokemonData);
        setUserSpecies(fetchedSpeciesData);

      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } //finally {
        //setLoading1(false); // Set loading to false when fetch is complete
      //}
    };

    fetchUserPokemonData();
  }, []);
  */
/*
useEffect(() => {
    const fetchUserPokemonData = async () => {
      try {
        //setLoading1(true);
        //this is what gets all the users pokemon and displays it
        const response = await axios.get(`http://localhost:3000/api/getUserPokemon/${userId}`);
        const userPokemonNames = response.data;

        // Create empty arrays to store Pokemon data and species data
        const fetchedPokemonData = [];
        const fetchedSpeciesData = [];

        // Assuming userPokemonNames is an array
        for (const pokemonName of userPokemonNames) {
          try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            const pokemonData = response.data;
            const speciesData = speciesResponse.data;

            // Add the data to respective arrays
            fetchedPokemonData.push(pokemonData);
            fetchedSpeciesData.push(speciesData);
          } catch (error) {
            console.error('Error fetching Pokémon data:', error);
          }
        }

        // Update state with the accumulated data
        setUserPokemon(fetchedPokemonData);
        setUserSpecies(fetchedSpeciesData);

      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } //finally {
        //setLoading1(false); // Set loading to false when fetch is complete
      //}
    };

    fetchUserPokemonData();
  }, []);
*/
//From handle select. Add pokemon to database
const addToUserCollection = async (pokemonName, pokemonData, speciesData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/addToUserCollection', {
        username: 'Abba', // Replace with actual username
        pokemonName: pokemonName
      });

      console.log('Added to user collection:', response.data);
      //adds pokemon to current page
      setUserPokemon([...userPokemon, pokemonData]); // Add new Pokémon data to the state
      setUserSpecies([...userSpecies, speciesData]); // Add new species data to the state
    } catch (error) {
      console.error('Error adding to user collection:', error);
    }
  };

/*
const fetchPokemonData = async (offset, limit) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
*/

//For a modal opening. gets clicked pokemon id from user_pokemon table.
const fetchUserPokemonById = async (index) => {
    try {
      const user_id = userId; // Get user_id from userId
      const pokemon_id = userPokemon[index].id; // Get pokemon_id from userPokemon[index]
      console.log('testing user id:', user_id);
      console.log('testing pokemon id:', pokemon_id);

      const response = await axios.get(`http://localhost:3000/api/getUserPokemonById/${user_id}/${pokemon_id}`);
      const userPokemonIdFromResponse = response.data[0].id;
      setUserPokemonId(userPokemonIdFromResponse);
      console.log('testing userpokemon id:', userPokemonId);
    } catch (error) {
      console.error('Error fetching user_pokemon IDs:', error);
    }
  };

  return (
    <div>
      <button onClick={toggleDropdown}>
        Add
      </button>
      {showDropdown && (
        <div>
          <label htmlFor="Dropdown">Choose a Pokemon:</label>
          <select id="Dropdown" onChange={handleSelect}>
            {pokemonList.map(pokemon => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
