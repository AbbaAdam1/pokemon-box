import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from "src/config/supabaseClient"

const Dropdown = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = response.data.results;
        const updatedPokemonList = [''].concat(pokemonData);
        setPokemonList(updatedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchPokemonData();
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const NEWhandleSelect = async (e) => {
    const selectedPokemonName = e.target.value;

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`);
      const selectedPokemonData = response.data;
      const selectedSpeciesData = speciesResponse.data;

      const selectedPokemonId = selectedPokemonData.id;

      const isDuplicate = props.userPokemon.some(pokemon => pokemon.name === selectedPokemonName);

      if (isDuplicate) {
        setErrorMessage('User already has this Pokémon');
      } else if (props.userPokemon.length >= 24) {
        setErrorMessage('User already has 24 or more Pokémon');
      } else {
        try {
          const { error } = await supabase
            .from('user_pokemon')
            .insert({ user_id: props.userId, pokemon_id: selectedPokemonId, pokemon: selectedPokemonName });

          if (!error) {
            props.setUserPokemon([...props.userPokemon, selectedPokemonData]);
            props.setUserSpecies([...props.userSpecies, selectedSpeciesData]);
          } else {
            setErrorMessage('Error inserting Pokemon data into user_pokemon');
          }
        } catch (error) {
          setErrorMessage('Error inserting Pokemon data into user_pokemon');
        }
      }
    } catch (error) {
      setErrorMessage('Error fetching Pokemon data');
    }

    setShowDropdown(false);
  }

  return (
    <div>
      <button onClick={toggleDropdown} type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
        Deposit Pokémon
      </button>
      {showDropdown && (
        <div className="pt-5 pb-5">
          <label htmlFor="Dropdown">Choose a Pokémon:</label>
          <select id="Dropdown" onChange={NEWhandleSelect}>
            {pokemonList.map((pokemon, index) => (
              <option key={index} value={pokemon.name}>
                {pokemon.name && pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
      )}
      {errorMessage && (
        <div className="text-red-700">
          {errorMessage}
          <button onClick={clearErrorMessage} className="text-blue-700 underline ml-2">Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
