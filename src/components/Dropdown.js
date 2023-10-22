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
        console.error('api');
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
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`);
    const pokemonData = response.data;
    const speciesData = speciesResponse.data;

    // Now you have the pokemonData, match it to your pokedex table on the client side
    try {
      const pokedexResponse = await axios.get(`http://localhost:3000/get-pokemon-by-name/${selectedPokemonName}`);
      const matchedPokemon = pokedexResponse.data[0]; // Assuming there's only one match

      // Pass the matchedPokemon to the parent component (App.js)
      props.onSelect({ pokemonData, matchedPokemon, speciesData });
    } catch (error) {
      console.error('Error fetching Pokemon data from pokedex:', error);
    }
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
  setShowDropdown(false);

  //add pokemon to collection
  addToUserCollection(matchedPokemon, pokemonData, speciesData);
};

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
////////////////////////////////////////////////////////////////////////////////////////////

const fetchPokemonData = async (offset, limit) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

//step 2,
const addToUserCollection = async (pokemonName, pokemonData, speciesData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/addToUserCollection', {
        username: 'Abba', // Replace with actual username
        pokemonName: pokemonName
      });

      console.log('Added to user collection:', response.data);
      setUserPokemon([...userPokemon, pokemonData]); // Add new Pokémon data to the state
      setUserSpecies([...userSpecies, speciesData]); // Add new species data to the state
    } catch (error) {
      console.error('Error adding to user collection:', error);
    }
  };

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
