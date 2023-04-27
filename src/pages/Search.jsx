import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_CHARACTERS } from "../queries/Search";
import { Link } from "react-router-dom";
import "./Search.css";

export default function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCharacters, { loading, error, data }] = useLazyQuery(
    SEARCH_CHARACTERS
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    searchCharacters({
      variables: { search: searchTerm },
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="container">
      <h1 className="title">
        Rick and Morty Character Database - Search
      </h1>
      <div className="menu">
        <button className="menu-button" onClick={() => navigate("/")}>Home</button>
        <button className="menu-button active">Search</button>
        <button className="menu-button" onClick={() => navigate("/Favorites")}>Favorites</button>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
        className="search-input"
        type="text"
        placeholder="Enter character name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="grid">
        {data &&
        data.characters.results.map((character) => (
        <Link key={character.id} to={`/CharacterDetail/${character.id}`}>
        <div key={character.name} className="card">
        <img className="card-image" src={character.image} alt={character.name} />
        <h3 className="card-title">{character.name}</h3>
        </div>
        </Link>
        ))}
      </div>
    </div>
  );
}
