import React, { useState, useEffect } from 'react';
import { fetchPokemonData } from '../components/PokeAPI';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: SpotifyAlbumData[] = await fetchAlbumsData();
        setAlbumsData(data);
      } catch (error) {
        console.error('Error fetching albums data:', error);
        setAlbumsData([]);
      }
    };

    fetchData();
  }, []);

  return (
   <main>

   </main>
  )
}

export default Box;