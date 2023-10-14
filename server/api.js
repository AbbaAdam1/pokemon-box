const axios = require('axios');
const db = require('./connection');

const fetchPokemonData = async (offset, limit) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};

const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data.id;
  } catch (error) {
    throw error;
  }
};

const processAndInsertData = async () => {
  const totalPokemon = 151;
  const limit = 20; // Number of Pokémon to fetch per request
  let offset = 0;  // Offset for paginating through results

  try {
    while (offset < totalPokemon) {
      const pokemonData = await fetchPokemonData(offset, limit);
      const pokemonNames = pokemonData.map(pokemon => pokemon.name);

      for (const name of pokemonNames) {
        try {
          const id = await fetchPokemonDetails(name);
          const queryString = 'INSERT INTO pokedex (id, pokemon) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
          await db.pool.query(queryString, [id, name]);
          console.log(`Inserted ${name} into pokedex with id ${id}`);
        } catch (error) {
          if (error.constraint === 'pokedex_pokemon_key') {
            console.log(`Skipped ${name} (already exists)`);
          } else {
            throw error;
          }
        }
      }
      offset += limit; // Move to the next page of results
    }

    console.log('All Pokémon data processed and inserted.');
  } catch (error) {
    console.error(error);
  }
};

// Call this function to start fetching and inserting Pokémon data
processAndInsertData();
