import React from 'react';
import Modal from 'react-modal';

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

const Modals = ({ isOpen, closeModal, pokemon, species }) => {
  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

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
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
};

export default Modals;
