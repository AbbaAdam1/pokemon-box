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

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { username, password } = request.body

  pool.query(
    'UPDATE users SET username = $1, password = $2 WHERE id = $3',
    [username, password, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
/////////////
const getPokemon = (request, response) => {
  pool.query('SELECT * FROM pokedex ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

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
  pool.query('SELECT * FROM user_pokemon ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserPokemonById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM user_pokemon WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

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

const deleteUserPokemon = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM user_pokemon WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User Pokemon deleted with ID: ${id}`)
  })
}

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
  pool,
}