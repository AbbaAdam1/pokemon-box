const express = require('express');
const bodyParser = require('body-parser');
const db = require('./connection');

const app = express();

const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define your routes here
app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.get('/pokemon', db.getPokemon)
app.get('/pokemon/:id', db.getPokemonById)
app.post('/pokemon', db.createPokemon)
app.put('/pokemon/:id', db.updatePokemon)
app.delete('/pokemon/:id', db.deletePokemon)

//app.get('/user_pokemon', db.getUserPokemon)
app.get('/api/getUserPokemonById/:user_id/:pokemon_id', db.getUserPokemonById);
app.post('/user_pokemon', db.createUserPokemon)
app.put('/user_pokemon/:id', db.updateUserPokemon)
//app.delete('/user_pokemon/:id', db.deleteUserPokemon)

app.get('/api/getUserPokemon/:user_id', db.getUserPokemon);
app.delete('/api/deleteUserPokemon/:id/:user_id/:pokemon_id', db.deleteUserPokemon);
app.get('/get-pokemon-by-name/:name', db.getPokemonByName);
app.post('/api/addPokemon', db.addPokemon);
app.post('/api/addToUserCollection', db.addToUserCollection);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});