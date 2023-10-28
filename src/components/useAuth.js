import { useState, useEffect } from 'react';
import supabase from "src/config/supabaseClient"

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUID = async () => {
    const { data: { user } } = await supabase.auth.getUser()
      try {
        //const { data } = await supabase.auth.getUser();
        const { data: { user } } = await supabase.auth.getUser()
        console.error('Error fetching user data:', user);

        //user = data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      setUser(user);
    }

    fetchUID();
  }, []);

  return user;
};

export default useAuth;