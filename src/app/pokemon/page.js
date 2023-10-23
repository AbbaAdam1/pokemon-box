'use client'
/*
const {
  fetchPokemonData,
  fetchPokemonDetails,
  processAndInsertData,
} = require('src/components/api');
*/
//import SignIn from 'src/components/Auth/SignIn';


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
//import '../index.css';
import supabase from "src/config/supabaseClient"
import Modals from 'src/components/Modals'
import Dropdown from 'src/components/Dropdown';
//import getUserPokemon from 'src/components/getUserPokemon'; // Adjust the path as needed

//import { AuthContextProvider } from '../context/AuthContext'



const PokemonTrainer = () => {
  /////const [pokemon, setPokemon] = useState(null);
  ////const [species, setSpecies] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userPokemonNames, setUserPokemonNames] = useState([]);
  const [userPokemon, setUserPokemon] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [userSpecies, setUserSpecies] = useState([]);
  const [userPokemonId, setUserPokemonId] = useState(null);
   const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  //const userId = 1;
  const user_id = 'a7b8bad1-ac99-41fc-a9a2-b62a4dfd8418';

 // const { data } = await supabase.auth.getSession();
/*
  if (data?.session) {
    redirect('/');
  }
*/

useEffect(() => {
    const fetchUserPokemonData = async () => {
/*
    SELECT p.pokemon
    FROM user_pokemon up
    JOIN pokedex p ON up.pokemon_id = p.id
    WHERE up.user_id = $1
*/
      const { data, error } = await supabase
            .from('user_pokemon') //good
            .select('pokemon_id(id:user_pokemon(id))') //not sure
            .eq('user_id', user_id); // good
      /*
            .from('user_pokemon')
            .select('pokemon_id(id:user_pokemon(id))')
            .eq('user_id', user_id);
      */
            if (error) {
              setFetchError('Could not fetch Pokemon')
              setUserPokemonNames(null)
              console.log(error)
            }

            if (data) {
              setUserPokemonNames(data)
              setFetchError(null)
            }
      try {
        setLoading1(true);

        console.log('are you real?')

        //const userPokemonNames = response.data;

        // Create empty arrays to store Pokemon data and species data
        const fetchedPokemonData = [];
        const fetchedSpeciesData = [];

        // Assuming userPokemonNames is an array
        for (const pokemonName of userPokemonNames) {
          try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            console.log(response)
            const pokemonData = response.data;
            const speciesData = speciesResponse.data;

            // Add the data to respective arrays
            fetchedPokemonData.push(pokemonData);
            fetchedSpeciesData.push(speciesData);
          } catch (error) {
            console.error('Error fetching User Pokémon data:', error);
          }
        }

        // Update state with the accumulated data
        setUserPokemon(fetchedPokemonData);
        setUserSpecies(fetchedSpeciesData);

      } catch (error) {
        console.error('Error fetching Pokémon details data:', error);
      } finally {
        setLoading1(false); // Set loading to false when fetch is complete
      }

    };

    fetchUserPokemonData();
  }, []);


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
/*this line just gets the user id. we already have that so its not necesscary
    const { data, error } = await supabase
                .from('users') //good
                .select('id')
                .eq('user_id', user_id); // good
*/
    try {
     // const response = await axios.post('http://localhost:3000/api/addToUserCollection', {
     //   username: 'Abba', // Replace with actual username
     //   pokemonName: pokemonName
     // });

      console.log('Added to user collection:', response.data);
      //adds pokemon to current page
      const userId = results.rows[0].id;

      //query^

      setUserPokemon([...userPokemon, pokemonData]); // Add new Pokémon data to the state
      setUserSpecies([...userSpecies, speciesData]); // Add new species data to the state
    } catch (error) {
      console.error('Error adding to user collection:', error);
    }
  };

const addToUserCollection = (request, response) => {
   const { username, pokemonName } = request.body;

   // First, get the user_id based on the username
   const getUserQuery = 'SELECT id FROM users WHERE username = $1';

   pool.query(getUserQuery, [username], async (error, results) => {
     if (error) {
       throw error;
     }

     try {
       const userId = results.rows[0].id;

       const pokemonNameStr = pokemonName.pokemon;

       // Use this information to add the Pokemon to the user's collection in the database.
       // Perform the necessary database operations here.

       const insertQuery = `
         INSERT INTO user_pokemon (user_id, pokemon_id)
         VALUES ($1, (SELECT id FROM pokedex WHERE pokemon = $2))
       `;

       console.log('userId:', userId);
       console.log('pokemonName:', pokemonNameStr);

       await pool.query(insertQuery, [userId, pokemonNameStr]);
       response.status(200).send('Added to user collection');
     } catch (error) {
       throw error;
     }
   });
 }


/*
const addToUserCollection = (request, response) => {
   const { username, pokemonName } = request.body;

   // First, get the user_id based on the username
   const getUserQuery = 'SELECT id FROM users WHERE username = $1';

   pool.query(getUserQuery, [username], async (error, results) => {
     if (error) {
       throw error;
     }

     try {
       const userId = results.rows[0].id;

       const pokemonNameStr = pokemonName.pokemon;

       // Use this information to add the Pokemon to the user's collection in the database.
       // Perform the necessary database operations here.

       const insertQuery = `
         INSERT INTO user_pokemon (user_id, pokemon_id)
         VALUES ($1, (SELECT id FROM pokedex WHERE pokemon = $2))
       `;

       console.log('userId:', userId);
       console.log('pokemonName:', pokemonNameStr);

       await pool.query(insertQuery, [userId, pokemonNameStr]);
       response.status(200).send('Added to user collection');
     } catch (error) {
       throw error;
     }
   });
 }
*/

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


///////

  const Popup = () => {
    return (
      <div className="popup">
        <button className="close-button" onClick={togglePopup}>X</button>
        <p>test</p>
      </div>
    );
  };

  return (
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
  );
};
export default PokemonTrainer;