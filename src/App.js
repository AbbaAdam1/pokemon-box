import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import Modals from './Modals.js'
import Dropdown from './Dropdown.js';

const PokemonData = () => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);

/*
  const handleSelect = ({ pokemonData, speciesData }) => {
    console.log('Selected Pokemon data in App:', pokemonData);
    console.log('Species data in App:', speciesData);

    setPokemon(pokemonData);
    setSpecies(speciesData);
  };
*/
  const handleSelect = ({ pokemonData, matchedPokemon }) => {
    console.log('Selected Pokemon data in App:', pokemonData);
    console.log('Matched Pokemon data in App:', matchedPokemon);

    // Assuming you have a function to add the matchedPokemon to the user's collection
    addToUserCollection(matchedPokemon);
  };

  const addToUserCollection = async (pokemonName) => {
    try {
      const response = await axios.post('http://localhost:3000/api/addToUserCollection', {
        username: 'Abba', // Replace with actual username
        pokemonName: pokemonName
      });

      console.log('Added to user collection:', response.data);
    } catch (error) {
      console.error('Error adding to user collection:', error);
    }
  };



  function openModal() {
    setIsOpen(true);
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
              pokemon && (
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 mt-6 absolute top-20 left-0">
                      <img
                          src={pokemon.sprites.front_default}
                          alt={pokemon.name}
                          onClick={openModal}
                      />
                      <Modals isOpen={modalIsOpen} closeModal={closeModal} pokemon={pokemon} species={species}/>
                  </div>
              )
          )}


          {showPopup && <Popup />}
        </div>
    </div>
  );
};

export default PokemonData;
