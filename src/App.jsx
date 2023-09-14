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
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-[#526D82] text-center">
      <h1 className="text-5xl font-bold p-3 mb-4">Pokemon Finder App</h1>
      <div className="mb-6">
        <input
          type="text"
          className="px-4 py-2 border rounded-lg w-64"
          placeholder="Enter Pokemon Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button
          className="ml-3 px-6 py-2 bg-[#DDE6ED] text-black rounded-lg "
          onClick={fetchPokemonData}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 p-40 text-xl font-bold mb-4">{error}</p>}
      {pokemonData && (
        <div className='bg-[#9DB2BF] border-2 border-black shadow-black shadow-lg rounded-lg items-center w-1/4 h-3/4 mb-4'>
          <h2 className="text-3xl p-4 font-semibold">{pokemonData.name.toUpperCase()}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
            alt={pokemonData.name}
            className="w-[360px] h-[360px] mx-auto mt-2"
          />
          <h3 className="text-xl text-center font-bold">Pokemon Details:</h3>
          <h4 className="text-center text-lg px-4 py-1 font-medium">
            <p>Height: {pokemonData.height / 10} meters</p>
            <p>Weight: {pokemonData.weight / 10} kilograms</p>
            <p>Type(s): {pokemonData.types.map((type) => type.type.name).join(', ')}</p>
          </h4>
        </div>
      )}
    </div>
  );
}

export default App;
