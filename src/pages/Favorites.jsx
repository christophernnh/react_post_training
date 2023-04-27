import { useQuery } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { FAVORITES } from "../queries/Favorites";
import "./Favorites.css";

export default function Favorites() {
  const navigate = useNavigate();
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const { loading, error, data } = useQuery(FAVORITES, {
    variables: { ID: favorites },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="container">
      <h1 className="title">
        Rick and Morty Character Database - Favorites
      </h1>
      <div className="button-group">
        <button className="button" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="button" onClick={() => navigate("/Search")}>
          Search
        </button>
        <button className="button active">Favorites</button>
      </div>
      {favorites.length === 0 ? (
        <p>You have no favorites yet!</p>
      ) : (
        <div className="grid">
          {data.charactersByIds.map((character) => (
            <Link key={character.id} to={`/CharacterDetail/${character.id}`}>
              <div key={character.id} className="card">
                <img src={character.image} alt={character.name} />
                <h3>{character.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
