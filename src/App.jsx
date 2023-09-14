import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemonData(response.data);
      setError(null);
    } catch (err) {
      setError('Pokemon not found. Please enter a valid name.');
      setPokemonData(null);
    }
  };

  return (
    <div>
      <h1>Pokemon App Finder</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Pokemon Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          onClick={fetchPokemonData}
        >
          Search
        </button>
      </div>
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
            alt={pokemonData.name}
          />
          <h3>Pokemon Details:</h3>
          <ul>
            <li>Height: {pokemonData.height / 10} meters</li>
            <li>Weight: {pokemonData.weight / 10} kilograms</li>
            <li>Type(s): {pokemonData.types.map((type) => type.type.name).join(', ')}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
