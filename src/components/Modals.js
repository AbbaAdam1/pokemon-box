import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import supabase from "src/config/supabaseClient"
import {typeImages, customStyles} from './ModalStyles';

Modal.setAppElement('#root');

const Modals = ({ isOpen, closeModal, pokemon, species, userId, pokemonId, index }) => {
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
    }
  };


  return (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            ...customStyles.content,
            animation: 'fadein 0.3s',
          },
        }}
        contentLabel="Pokemon Modal"
      >

        <div className="container mx-auto">
          <h2 className="text-xl font-bold mb-4">#{pokemon.id}: {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <button className="absolute top-2 right-2 pt-3 pr-3 text-red-600 font-bold text-xl" onClick={closeModal}>X</button>
          <div className="flex justify-center items-center">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              style={{ width: '270px', height: '270px' }}
            />
          </div>
          <p className="mb-4">{flavorTextEn || 'Flavor text not available in English.'}</p>
          <div className="mb-4 flex flex-col items-center">
            <p className="mb-2 mr-1">Type:</p>
            <div className="flex">
              <img className="mr-2" src={typeImages[pokemon.types[0].type.name]} alt={pokemon.name} />
              {pokemon.types[1] && <img src={typeImages[pokemon.types[1].type.name]} alt={pokemon.name} />}
            </div>
          </div>

          <form className="text-center">
            <button onClick={deleteFromUserCollection} className="focus:outline-none text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
              Release Pokemon
            </button>
          </form>
        </div>
      </Modal>
    );
  };

export default Modals;
