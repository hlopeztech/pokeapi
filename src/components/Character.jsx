import React, { useEffect, useState } from "react";

function Character({ character }) {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${character.url}`);
      const data = await response.json();
      setPokemon(data.sprites);
    }

    fetchData();
  }, [pokemon]);

  return (
    <div className="text-center p-5">
      <h3>{character.name}</h3>
      <img
        className="img-fluid rounded-pill"
        src={pokemon.front_default ? pokemon.front_default : "https://via.placeholder.com/150"}
      />
      <p>{pokemon.name}</p>
    </div>
  );
}

export default Character;
