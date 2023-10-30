import axios from 'axios';
import supabase from "src/config/supabaseClient";

//fetch all user's pokemon
export const fetchUserPokemonData = async (user) => {
  const { data, error } = await supabase
    .from('user_pokemon')
    .select('pokemon')
    .eq('user_id', user.id);

  if (error) {
    console.error('Could not fetch Pokemon data:', error);
    return { userPokemon: [], userSpecies: [], fetchError: 'Could not fetch Pokemon data' };
  }

  const userPokemonNames = data.map(obj => obj.pokemon);

  const fetchedPokemonData = [];
  const fetchedSpeciesData = [];

  for (const pokemonName of userPokemonNames) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      const pokemonData = response.data;
      const speciesData = speciesResponse.data;

      fetchedPokemonData.push(pokemonData);
      fetchedSpeciesData.push(speciesData);
    } catch (error) {
      console.error('Error fetching User Pokémon data:', error);
    }
  }

  return { userPokemon: fetchedPokemonData, userSpecies: fetchedSpeciesData, fetchError: null };
};

//fetch user's id
export const fetchUID = async () => {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const openModal = (index, setIsOpen, setSelectedPokemonIndex) => {
  setIsOpen(true);
  setSelectedPokemonIndex(index);
};

export const closeModal = setIsOpen => {
  setIsOpen(false);
};
