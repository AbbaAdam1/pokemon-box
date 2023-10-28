import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import supabase from "src/config/supabaseClient"

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

//Modal.setAppElement('#root'); // Ensure it's accessible by screen readers

const Modals = ({ isOpen, closeModal, pokemon, species, userId, pokemonId, index }) => {
  let subtitle;
  const [userPokemonId, setUserPokemonId] = useState(null);
  //console.log(index)

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  useEffect(() => {
    console.log("pokemonId in useEffect:", pokemonId);
    // Additional code that relies on userPokemonNames goes here
  }, [pokemonId]);

  useEffect(() => {
      const fetchUserPokemonById = async () => {
          console.log('testing userId id:', userId);
          console.log('testing pokemonId id:', pokemonId);
          try {
            //const user_id = userId; // Get user_id from userId
            //const pokemonId = userPokemon[index].id; // Get pokemon_id from userPokemon[index]
            //console.log('testing user id:', user_id);
            //console.log('testing pokemon id:', pokemon_id);

            //const response = await axios.get(`http://localhost:3000/api/getUserPokemonById/${userId}/${pokemonId}`
            const { data, error } = await supabase
                             .from('user_pokemon') //good
                             .select('id')
                             .eq({userId, pokemonId });
                             //.eq({ user_id: userId, pokemon_id: pokemonId });

            //const userPokemonIdFromResponse = response.data[0].id;
            setUserPokemonId(data);
            //console.log('testing userpokemon id:', userPokemonId);
          } catch (error) {
            console.error('Error fetching user_pokemon IDs:', error);
          }
      };

      fetchUserPokemonById();
  }, []);

/*
  function openModal(index) {
    setIsOpen(true);
    setSelectedPokemonIndex(index);
    //fetchUserPokemonById(index);
  }

  function closeModal() {
    setIsOpen(false);
  }
*/
  const deleteFromUserCollection = async () => {
    //console.log("index test:", userPokemonId)
    const { error } = await supabase
                .from('user_pokemon') //good
                .delete()
                .eq('pokemon_id', pokemonId);
                //.eq('id', index);
                //.eq({ id: userPokemonId, user_id: userId, pokemon_id: pokemonId });
    //try {
    //  const response = await axios.delete(`http://localhost:3000/api/deleteUserPokemon/${userPokemonId}/${userId}/${pokemonId}`);
    //  console.log('Deleted Pokemon:', response.data);
    //} catch (error) {
    //  console.error('Error deleting Pokemon:', error);
    //}
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
