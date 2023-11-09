'use client'

import React, { useState, useEffect } from 'react';
import Modals from 'src/components/Modals'
import Dropdown from 'src/components/Dropdown';
import {
  fetchUserPokemonData,
  openModal,
  closeModal
} from './PokemonHelpers';

const PokemonTrainer = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userPokemon, setUserPokemon] = useState([]);
  const [userSpecies, setUserSpecies] = useState([]);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);

  //get list of user's pokemon
  useEffect(() => {
    const fetchData = async () => {
      const { userPokemon, userSpecies } = await fetchUserPokemonData(user);

      setUserPokemon(userPokemon);
      setUserSpecies(userSpecies);

      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center pb-5">
          <img
            src="loading.gif"
            alt="Loading"
            className="w-7 h-7"
          />
        </div>
      )}

      {!loading && (
        <Dropdown
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
            src="box_forest.png"
            alt="Background"
            style={{ width: '648px', height: '592px' }}
          />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-9 sm:gap-0 mt-6 absolute top-20 left-0">
          {userPokemon.map((pokemonData, index) => (
            <div key={index} className="cursor-pointer">
              <div className="relative w-30 h-10 sm:w-24 sm:h-24 md:w-36 md:h-36">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
                  alt={pokemonData.name}
                  onClick={() => openModal(index, setIsOpen, setSelectedPokemonIndex)}
                />
              </div>
              {userSpecies[index] && (
                <Modals
                  isOpen={modalIsOpen && selectedPokemonIndex === index}
                  closeModal={() => closeModal(setIsOpen)}
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
    </div>
  );
};

export default PokemonTrainer;