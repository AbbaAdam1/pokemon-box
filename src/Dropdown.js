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
/*
const handleSelect = async (e) => {
  console.log(`Selected Pokemon: ${e.target.value}`);
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`);
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${e.target.value}`);
    console.log('API Response:', response.data);
    console.log('Species Response:', speciesResponse.data);

    props.onSelect({
      pokemonData: response.data,
      speciesData: speciesResponse.data
    });
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
  setShowDropdown(false);
};
*/
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
      //const pokedexResponse = await axios.get(`/get-pokemon-by-name/${selectedPokemonName}`);
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
};

/* before
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
      //const pokedexResponse = await axios.get(`/get-pokemon-by-name/${selectedPokemonName}`);
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
};
*/

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //const handleSelect = (e) => {
  //  console.log(`Selected Pokemon: ${e.target.value}`);
  //  setShowDropdown(false);
  //};

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
