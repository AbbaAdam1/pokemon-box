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
import Modals from 'src/components/Modals'
import Dropdown from 'src/components/Dropdown';

//import { AuthContextProvider } from '../context/AuthContext'



const PokemonTrainer = () => {
  /////const [pokemon, setPokemon] = useState(null);
  ////const [species, setSpecies] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userPokemon, setUserPokemon] = useState([]);
  const [userSpecies, setUserSpecies] = useState([]);
  const [userPokemonId, setUserPokemonId] = useState(null);
   const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);
  const userId = 1;

 // const { data } = await supabase.auth.getSession();
/*
  if (data?.session) {
    redirect('/');
  }
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