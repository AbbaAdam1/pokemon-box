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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
////////////////////////////////////////////////////////////////////////////////////////////
  const NEWhandleSelect = async (e) => {
    const selectedPokemonName = e.target.value; //NEEDED
    //PASS PROPS AS YOU DID BEFORE

    try {
      //selects pokemon and passes pokemon/species data
      //NECESSARY BELOW
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`);
      const selectedPokemonData = response.data; //pokemon api data
      const selectedSpeciesData = speciesResponse.data; //species api data

      const selectedPokemonId = pokemonData.id;

      //setPokemon(selectedPokemonData);
      //setSpecies(selectedSpeciesData);
      //NECESSARY ABOVE

      try {
        //this is to get the name. you can probably just get the name from pokemonData so probably not necessary
        //INSERT statement
        const { error } = await supabase
                        .from('user_pokemon') //good
                        .insert({ user_id: userId, pokemon_id: selectedPokemonId }) //replace 1 and denmark with user id and pokemon id

        setUserPokemon([...userPokemon, selectedPokemonData]); // Add new Pokémon data to the state
        setUserSpecies([...userSpecies, selectedSpeciesData]); // Add new species data to the state
      } catch (error) {
        console.error('Error inserting Pokemon data into user_pokemon:', error);
      }
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
    setShowDropdown(false);
  };


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
