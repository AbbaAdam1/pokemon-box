import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import supabase from "src/config/supabaseClient"
import {typeImages, customStyles} from './ModalStyles';

Modal.setAppElement('#root');

const Modals = ({ isOpen, closeModal, pokemon, species, userId, pokemonId, index, onDelete }) => {
  const [flavorTextEn, setFlavorTextEn] = useState(null);

  useEffect(() => {
    // Find the entry with language "en" and extract the flavor text
    for (const entry of species.flavor_text_entries) {
      if (entry.language.name === "en") {
        setFlavorTextEn(entry.flavor_text);
        break;
      }
    }
  }, [species]);

  const deleteFromUserCollection = async () => {
    const { error } = await supabase
      .from('user_pokemon')
      .delete()
      .eq('pokemon_id', pokemonId);

    if (error) {
      console.error('Error deleting from user collection:', error);
      return;
    }

    onDelete(pokemonId);
    closeModal();
  };


  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1000,
          },
          content: {
            ...customStyles.content,
            animation: 'fadein 0.3s',
            border: 'none',
            borderRadius: '16px',
            padding: '0',
            maxWidth: '500px',
            margin: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        }}
        contentLabel="Pokemon Modal"
      >
        <div className="relative bg-gradient-to-b from-gray-50 to-white rounded-2xl overflow-hidden">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 shadow-md transition-all duration-200 text-gray-600 hover:text-gray-800"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-4">
              <span className="text-sm font-semibold text-gray-500">#{String(pokemon.id).padStart(3, '0')}</span>
              <h2 className="text-3xl font-bold text-gray-800 mt-1">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>
            </div>

            {/* Pokemon Image */}
            <div className="flex justify-center items-center mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                className="w-64 h-64 drop-shadow-lg"
              />
            </div>

            {/* Type badges */}
            <div className="mb-6 flex justify-center gap-3">
              <img
                className="h-8 transition-transform hover:scale-110"
                src={typeImages[pokemon.types[0].type.name]}
                alt={pokemon.types[0].type.name}
              />
              {pokemon.types[1] && (
                <img
                  className="h-8 transition-transform hover:scale-110"
                  src={typeImages[pokemon.types[1].type.name]}
                  alt={pokemon.types[1].type.name}
                />
              )}
            </div>

            {/* Flavor text */}
            <p className="text-gray-600 text-center leading-relaxed mb-6 px-2">
              {flavorTextEn || 'Flavor text not available in English.'}
            </p>

            {/* Release button */}
            <div className="text-center pt-4 border-t border-gray-200">
              <button
                onClick={deleteFromUserCollection}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Release Pokémon
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  };

export default Modals;
