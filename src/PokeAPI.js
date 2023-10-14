import axios from 'axios';
import React, { useState, useEffect } from 'react';

const PokemonData = () => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/pikachu');
        setPokemon(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/pikachu');
        setSpecies(response.data);
      } catch (error) {
        console.error('Error fetching species data:', error);
      }
    };

    fetchSpeciesData();
  }, []);
};

