import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://dpnjftjxqogingjrhdoi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbmpmdGp4cW9naW5nanJoZG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc3NjE4NTIsImV4cCI6MjAxMzMzNzg1Mn0.libykAV01YadD8NOOvD1ri5OyY3BGFI7gRYuUIsaPWY');

console.log('MID')

const getUserPokemon = async (user_id) => {
  console.log('MIDday')
  try {
    const { data, error } = await supabase
      .from('user_pokemon')
      .select('pokemon')
      .eq('user_id', user_id);

    if (error) {
      throw error;
    }

    const pokemonNames = data.map(row => row.pokemon);
    return pokemonNames;
  } catch (error) {
    console.error('Error fetching user Pokemon:', error);
    throw new Error('Internal Server Error');
  }
};

export default getUserPokemon;
