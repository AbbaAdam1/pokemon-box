'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import supabase from "src/config/supabaseClient"
import Modals from 'src/components/Modals'
import Dropdown from 'src/components/Dropdown';

const PokemonTrainer = ({ user }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userPokemon, setUserPokemon] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [userSpecies, setUserSpecies] = useState([]);
  const [userPokemonId, setUserPokemonId] = useState(null);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const userId = 'a7b8bad1-ac99-41fc-a9a2-b62a4dfd8418';

useEffect(() => {
    const fetchUserPokemonData = async () => {

      const { data, error } = await supabase
            .from('user_pokemon')
            .select('pokemon')
            .eq('user_id', user.id);

            if (error) {
              setFetchError('Could not fetch Pokemon')
              console.log(error)
            }

              const userPokemonNames = data.map(obj => obj.pokemon);

              setFetchError(null)

        setLoading1(true);


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
            console.error('Error fetching User Pokémon data:', error);
          }
        }

        // Update state with the accumulated data
        setUserPokemon(fetchedPokemonData);
        setUserSpecies(fetchedSpeciesData);

        setLoading1(false); // Set loading to false when fetch is complete
    };

    fetchUserPokemonData();
  }, []);


useEffect(() => {
  const fetchUID = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      setCurrentUser(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUID();
}, [setCurrentUser]);


  const handleSelect = ({ pokemonData, matchedPokemon, speciesData }) => {
    console.log('Selected Pokemon data in App:', pokemonData);
    console.log('Matched Pokemon data in App:', matchedPokemon);
    console.log('Species Pokemon data in App:', speciesData);

    setPokemon(pokemonData);
    setSpecies(speciesData);

    addToUserCollection(matchedPokemon, pokemonData, speciesData);
  };

const THIShandleSelect = async (e) => {
  const selectedPokemonName = e.target.value;

  try {
    //selects pokemon and passes pokemon/species data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonName}`);
    const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemonName}`);
    const selectedPokemonData = response.data; //pokemon api data
    const selectedSpeciesData = speciesResponse.data; //species api data

    const selectedPokemonId = pokemonData.id;

    try {
      //INSERT statement
      const { error } = await supabase
                      .from('user_pokemon') //good
                      .insert({ user_id: user.id, pokemon_id: selectedPokemonId }) //replace 1 and denmark with user id and pokemon id

      //just figure out how to
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

  function openModal(index) {
    setIsOpen(true);
    setSelectedPokemonIndex(index);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
      {loading1 && (
        <div className="flex justify-center items-center pb-5">
          <img
            src="loading.gif"
            alt="Loading"
            className="w-7 h-7"
          />
        </div>
      )}

      {!loading1 && (
            <Dropdown
              onSelect={THIShandleSelect}
              setUserPokemon={setUserPokemon}
              setUserSpecies={setUserSpecies}
              userPokemon={userPokemon}
              userSpecies={userSpecies}
              userId={user.id}
            />
          )}

      <div className="pokemon-container">
        <div className="background-image">
          <img
            src="Box_Forest_Up.png"
            alt="Background"
            style={{ width: '648px', height: '592px' }}
          />
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-6 absolute top-20 left-0">
          {userPokemon.map((pokemonData, index) => (
            <div key={index} className="cursor-pointer">
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
                  userId={user.id}
                  pokemonId={pokemonData.id}
                  index={index}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {showPopup && <Popup />}
    </div>
  );

};
export default PokemonTrainer;