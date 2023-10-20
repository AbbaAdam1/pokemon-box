const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pokemon',
  password: 'Supermario1',
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { username, password } = request.body

  pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

/////////////

const getPokemonById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM pokedex WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPokemon = (request, response) => {
  const { pokemon } = request.body

  pool.query('INSERT INTO pokedex (pokemon) VALUES ($1)', [pokemon], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Pokemon added with ID: ${results.insertId}`)
  })
}

const updatePokemon = (request, response) => {
  const id = parseInt(request.params.id)
  const { pokemon } = request.body

  pool.query(
    'UPDATE pokedex SET pokemon = $1 WHERE id = $2',
    [pokemon],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Pokemon modified with ID: ${id}`)
    }
  )
}

const deletePokemon = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM pokedex WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Pokemon deleted with ID: ${id}`)
  })
}
///////////////
const getUserPokemon = (request, response) => {
  const user_id = request.params.user_id;
  const queryString = `
    SELECT p.pokemon
    FROM user_pokemon up
    JOIN pokedex p ON up.pokemon_id = p.id
    WHERE up.user_id = $1
  `;

  pool.query(queryString, [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    const pokemonNames = results.rows.map(row => row.pokemon);
    response.status(200).json(pokemonNames);
  });
};


/*
const getUserPokemon = (request, response) => {
  const user_id = request.params.user_id;
  const queryString = 'SELECT * FROM user_pokemon WHERE user_id = $1';
  db.pool.query(queryString, [user_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

/*
const getUserPokemon = (request, response) => {
  pool.query('SELECT * FROM user_pokemon ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
*/
/*///////////////////////
const getUserPokemonById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM user_pokemon WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
*/////////////////
const createUserPokemon = (request, response) => {
  const { user_id, pokemon_id } = request.body

  pool.query('INSERT INTO user_pokemon (user_id, pokemon_id) VALUES ($1, $2)', [user_id, pokemon_id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User Pokemon added with ID: ${results.insertId}`)
  })
}

const updateUserPokemon = (request, response) => {
  const id = parseInt(request.params.id)
  const { user_id, pokemon_id } = request.body

  pool.query(
    'UPDATE user_pokemon SET user_id = $1, pokemon_id = $2 WHERE id = $3',
    [user_id, pokemon_id, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User Pokemon modified with ID: ${id}`)
    }
  )
}

/*
const deleteUserPokemon = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM user_pokemon WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User Pokemon deleted with ID: ${id}`)
  })
}


const deleteUserPokemon = (request, response) => {
  const user_id = parseInt(request.params.user_id);
  const pokemon_id = parseInt(request.params.pokemon_id);

  pool.query('DELETE FROM user_pokemon WHERE user_id = $1 AND pokemon_id = $2', [user_id, pokemon_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User Pokemon deleted with user ID: ${user_id} and pokemon ID: ${pokemon_id}`);
  });
};
*/

const getUserPokemonById = (request, response) => {
  const user_id = request.params.user_id;
  const pokemon_id = request.params.pokemon_id;

  console.log('TESTING', user_id)
  console.log('TESTING', pokemon_id)

  const queryString = `
    SELECT id FROM user_pokemon
    WHERE user_id = $1 AND pokemon_id = $2
  `;

  pool.query(queryString, [user_id, pokemon_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows)
  });
};

/*
const deleteUserPokemon = (request, response) => {
  const user_id = request.params.user_id;
  const pokemon_id = request.params.pokemon_id;

  console.log(user_id)
  console.log(pokemon_id)

  const queryString = `
    DELETE FROM user_pokemon
    WHERE user_id = $1 AND pokemon_id = $2
  `;

  pool.query(queryString, [user_id, pokemon_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User Pokemon deleted with ID: ${pokemon_id}`);
  });
};
*/

const deleteUserPokemon = (request, response) => {
  const id = request.params.id;
  const user_id = request.params.user_id;
  const pokemon_id = request.params.pokemon_id;

  console.log(id)
  const test = parseInt(id)
  console.log(test)
  console.log(user_id)
  console.log(pokemon_id)

  const queryString = `
    DELETE FROM user_pokemon
    WHERE id = $1 AND user_id = $2 AND pokemon_id = $3
  `;

  pool.query(queryString, [id, user_id, pokemon_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User Pokemon deleted with ID: ${id}`);
  });
};

const addPokemon = async (request, response) => {
  const { name } = request.body;

  try {
    const id = await fetchPokemonDetails(name); // Assuming fetchPokemonDetails gets the ID
    const queryString = 'INSERT INTO pokedex (id, pokemon) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING';
    await pool.query(queryString, [id, name]);
    response.status(201).send(`Pokemon added with ID: ${id}`);
  } catch (error) {
    if (error.constraint === 'pokedex_pokemon_key') {
      response.status(200).send(`Skipped ${name} (already exists)`);
    } else {
      response.status(500).send('Internal Server Error');
    }
  }
}

const addToUserCollection = (request, response) => {
   const { username, pokemonName } = request.body;

   // First, get the user_id based on the username
   const getUserQuery = 'SELECT id FROM users WHERE username = $1';

   pool.query(getUserQuery, [username], async (error, results) => {
     if (error) {
       throw error;
     }

     try {
       const userId = results.rows[0].id;

       const pokemonNameStr = pokemonName.pokemon;

       // Use this information to add the Pokemon to the user's collection in the database.
       // Perform the necessary database operations here.

       const insertQuery = `
         INSERT INTO user_pokemon (user_id, pokemon_id)
         VALUES ($1, (SELECT id FROM pokedex WHERE pokemon = $2))
       `;

       console.log('userId:', userId);
       console.log('pokemonName:', pokemonNameStr);

       await pool.query(insertQuery, [userId, pokemonNameStr]);
       response.status(200).send('Added to user collection');
     } catch (error) {
       throw error;
     }
   });
 }

 const createUserInDatabase = async (userId, email) => {
   try {
     const query = 'INSERT INTO users (user_id, email) VALUES ($1, $2)';
     const values = [userId, email];

     const result = await pool.query(query, values);
     console.log('User added to database:', result.rows[0]);
   } catch (error) {
     console.error('Error adding user to database:', error);
   }
 };


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getPokemon,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
  getUserPokemon,
  getUserPokemonById,
  createUserPokemon,
  updateUserPokemon,
  deleteUserPokemon,
  getPokemonByName,
  addPokemon,
  addToUserCollection,
  createUserInDatabase,
  pool,
}