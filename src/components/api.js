const axios = require('axios');
const db = require('./connection');

//const [pokemon, setPokemon] = useState(null);
//const [userPokemon, setUserPokemon] = useState([]);
//const [userSpecies, setUserSpecies] = useState([]);
//const [userPokemonId, setUserPokemonId] = useState(null);

const fetchPokemonData = async (offset, limit) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
    return response.data.results;
  } catch (error) {
    throw error;
  }
};
/*
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
*/
//////////////////////////////

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
/*
useEffect(() => {
    const fetchUserPokemonData = async () => {
      try {
        setLoading1(true);
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
      } finally {
        setLoading1(false); // Set loading to false when fetch is complete
      }
    };

    fetchUserPokemonData();
  }, []);
  */

    const fetchUserPokemonData = async () => {
      try {
        setLoading1(true);
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
      } finally {
        setLoading1(false); // Set loading to false when fetch is complete
      }
    };

 // };

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


module.exports = {
  fetchPokemonData,
  //processAndInsertData,
  addToUserCollection,
  fetchUserPokemonData,
  fetchUserPokemonById,
};

// Call this function to start fetching and inserting Pokémon data
//processAndInsertData();
