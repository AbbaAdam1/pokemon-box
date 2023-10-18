import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root'); // Ensure it's accessible by screen readers

const Modals = ({ isOpen, closeModal, pokemon, species, userId, pokemonId }) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
/*
    const deleteFromUserCollection = async () => {
      try {
        console.log('test');
        const response = await axios.delete(`http://localhost:3000/api/deleteUserPokemon/${userId}/${pokemonId}`);
        console.log('Deleted Pokemon:', response.data);
      } catch (error) {
        console.error('Error deleting Pokemon:', error);
      }
    };
*/

  const deleteFromUserCollection = async () => {
    console.log(userId)
    console.log(pokemonId)
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteUserPokemon/${userId}/${pokemonId}`);
      console.log('Deleted Pokemon:', response.data);
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Pokemon Modal"
    >
      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>#{pokemon.id} {pokemon.name}</h2>
      <button className="absolute top-0 right-2" onClick={closeModal}>X</button>
      <img
         src={pokemon.sprites.other['official-artwork'].front_default}
         alt={pokemon.name}
      />
      <p>{species.flavor_text_entries[0].flavor_text}</p>
      <p>Primary type: {pokemon.types[0].type.name}</p>
      {pokemon.types[1] && <p>Secondary type: {pokemon.types[1].type.name}</p>}

      <form>
        <input />
        <button onClick={deleteFromUserCollection}>Release Pokemon</button>
      </form>
    </Modal>
  );
};

export default Modals;
