import React, { useState, useEffect } from 'react';
import axios from 'axios';
import supabase from "src/config/supabaseClient"

const Dropdown = (props) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = 'a7b8bad1-ac99-41fc-a9a2-b62a4dfd8418';


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonData = response.data.results;
        const updatedPokemonList = [''].concat(pokemonData); // Add empty value at the beginning
        setPokemonList(updatedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };
    fetchPokemonData(); // Call the function
  }, []);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
////////////////////////////////////////////////////////////////////////////////////////////
const NEWhandleSelect = async (e) => {
  const selectedPokemonName = e.target.value; //NEEDED

  try {
    //selects pokemon and passes pokemon/species data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`);
    const selectedPokemonData = response.data; //pokemon api data
    const selectedSpeciesData = speciesResponse.data; //species api data

    const selectedPokemonId = selectedPokemonData.id;

    const isDuplicate = props.userPokemon.some(pokemon => pokemon.name === selectedPokemonName);

    if (isDuplicate) {
      console.log('User already has this Pokémon');
    } else if (props.userPokemon.length <= 13) {
      try {
        const { error } = await supabase
          .from('user_pokemon')
          .insert({ user_id: userId, pokemon_id: selectedPokemonId, pokemon: selectedPokemonName });

        if (!error) {
          props.setUserPokemon([...props.userPokemon, selectedPokemonData]);
          props.setUserSpecies([...props.userSpecies, selectedSpeciesData]);
        } else {
          console.error('Error inserting Pokemon data into user_pokemon:', error);
        }
      } catch (error) {
        console.error('Error inserting Pokemon data into user_pokemon:', error);
      }
    } else {
      console.log('User already has 8 or more Pokemon');
    }
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }

  setShowDropdown(false);
}


  /*
        try {
          //this is to get the name. you can probably just get the name from pokemonData so probably not necessary
          //INSERT statement
          const { error } = await supabase
                          .from('user_pokemon') //good
                          .insert({ user_id: userId, pokemon_id: selectedPokemonId, pokemon: selectedPokemonName }) //replace 1 and denmark with user id and pokemon id

          //setUserPokemon([...userPokemon, selectedPokemonData]); // Add new Pokémon data to the state
          //setUserSpecies([...userSpecies, selectedSpeciesData]); // Add new species data to the state
          props.setUserPokemon([...props.userPokemon, selectedPokemonData]);
          props.setUserSpecies([...props.userSpecies, selectedSpeciesData]);
        } catch (error) {
          console.error('Error inserting Pokemon data into user_pokemon:', error);
        }
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
  */

  //setShowDropdown(false);
  //};


  return (
    <div>
      <button onClick={toggleDropdown}>
        Add
      </button>
      {showDropdown && (
        <div>
        //when dropdown gets selected, it shows a list of pokemon
          <label htmlFor="Dropdown">Choose a Pokemon:</label>
          //activates handle select on dropdown when option is selected
          <select id="Dropdown" onChange={NEWhandleSelect}>
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
