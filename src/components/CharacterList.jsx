import React from "react";
import { useEffect, useState } from "react";
import Character from "./Character";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  function NavPage({page, setPage}) {
    return (
        <header className="d-flex justify-content-between align-items-center">
            <p>Page: {page}</p>
            <button className="btn btn-primary btn-sm" onClick={() => setPage( page + 1 )}>
                Page {page + 1}
            </button>
        </header>
    )
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10 - 10}`
      );
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage}/>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="row">
          {characters.map((character, index) => {
            return (
              <div key={index} className="col-md-3">
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
      <NavPage page={page} setPage={setPage}/>
    </div>
  );
}

export default CharacterList;