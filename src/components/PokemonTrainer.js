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
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userPokemon, setUserPokemon] = useState([]);
  const [selectedPokemonIndex, setSelectedPokemonIndex] = useState(null);

  //get list of user's pokemon
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { userPokemon: userCollection, fetchError } = await fetchUserPokemonData(user);

        if (!isMounted) return;

        setUserPokemon(userCollection || []);
        setError(fetchError || null);
      } catch (err) {
        if (!isMounted) return;
        setError('Unable to load your Pokémon box right now.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleDeletePokemon = (deletedPokemonId) => {
    setUserPokemon(prev => prev.filter(entry => entry.pokemon.id !== deletedPokemonId));
  };

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

      {!loading && !error && (
        <Dropdown
          setUserPokemon={setUserPokemon}
          userPokemon={userPokemon}
          userId={user.id}
        />
      )}

      {error && (
        <div className="text-red-500 text-center pb-4">
          {error}
        </div>
      )}

      {!loading && !error && userPokemon.length === 0 && (
        <div className="text-center pb-4">Your Pokémon box is empty.</div>
      )}

      <div className="pokemon-container">
        <div className="background-image">
          <img
            src="box_forest.png"
            alt="Background"
            style={{ width: '648px', height: '592px' }}
          />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 mt-6 absolute top-20 left-0">
          {userPokemon.map((entry, index) => {
            const pokemonData = entry.pokemon;
            const speciesData = entry.species;

            return (
              <div key={pokemonData.id} className="cursor-pointer">
                <div className="relative w-30 h-30 sm:w-24 sm:h-24 md:w-36 md:h-36">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
                    alt={pokemonData.name}
                    onClick={() => openModal(index, setIsOpen, setSelectedPokemonIndex)}
                  />
                </div>
                {speciesData && (
                  <Modals
                    isOpen={modalIsOpen && selectedPokemonIndex === index}
                    closeModal={() => closeModal(setIsOpen)}
                    pokemon={pokemonData}
                    species={speciesData}
                    userId={user.id}
                    pokemonId={pokemonData.id}
                    index={index}
                    onDelete={handleDeletePokemon}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonTrainer;