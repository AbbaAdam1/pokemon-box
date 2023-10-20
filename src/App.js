import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Modals from './Modals.js'
import Dropdown from './Dropdown.js';
import { AuthContextProvider } from '@/context/AuthContext'

const PokemonData = () => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userPokemon, setUserPokemon] = useState([]);
  const [userSpecies, setUserSpecies] = useState([]);
  const [userPokemonId, setUserPokemonId] = useState(null);
   const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const userId = 1;

/*
  const handleSelect = ({ pokemonData, speciesData }) => {
    console.log('Selected Pokemon data in App:', pokemonData);
    console.log('Species data in App:', speciesData);

    setPokemon(pokemonData);
    setSpecies(speciesData);
  };
*/
  const handleSelect = ({ pokemonData, matchedPokemon, speciesData }) => {
    console.log('Selected Pokemon data in App:', pokemonData);
    console.log('Matched Pokemon data in App:', matchedPokemon);
    console.log('Species Pokemon data in App:', speciesData);

    //SET POKEMON AND SPECIES HERE
    //LOOK UP HOW TO MAP USERPOKEMON CHAT
    setPokemon(pokemonData);
    setSpecies(speciesData);

    // Assuming you have a function to add the matchedPokemon to the user's collection
    addToUserCollection(matchedPokemon, pokemonData, speciesData);
  };

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




  function openModal(index) {
    setIsOpen(true);
    setSelectedPokemonIndex(index);
    fetchUserPokemonById(index);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
/*
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/ekans');
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);
*/

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



  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/ekans');
        setSpecies(response.data);
        setLoading1(false);
      } catch (error) {
        console.error('Error fetching species data:', error);
        setLoading1(false);
      }
    };

    fetchSpeciesData();
  }, []);

///////
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

useEffect(() => {
  console.log('testing userpokemon id again:', userPokemonId);
  //const tester = userPokemonId.data[0].id;;
  //console.log(tester);
}, [userPokemonId]);

  const Popup = () => {
    return (
      <div className="popup">
        <button className="close-button" onClick={togglePopup}>X</button>
        <p>test</p>
      </div>
    );
  };

  return (
  <AuthContextProvider>
    <div>
      <Dropdown onSelect={handleSelect}/>
      <div className="pokemon-container">
        <div className="background-image">
          <img
            src="Box_Forest_Up.png"
            alt="Background"
            style={{ width: '648px', height: '592px' }}
          />
        </div>

        {loading1 ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-6 absolute top-20 left-0">
            {userPokemon.map((pokemonData, index) => (
              <div key={index}>
                <img
                  src={pokemonData.sprites.front_default}
                  alt={pokemonData.name}
                  onClick={() => openModal(index)}
                />
                {userSpecies[index] && (
                  <Modals
                    isOpen={modalIsOpen && selectedPokemonIndex === index}
                    closeModal={closeModal}
                    pokemon={pokemonData}
                    species={userSpecies[index]}
                    userId={userId}
                    pokemonId={pokemonData.id}
                    userPokemonId={userPokemonId}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {showPopup && <Popup />}
      </div>
    </div>
    </AuthContextProvider>
  );
};

export default PokemonData;
