import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CHARACTER_DETAIL } from "../queries/CharacterDetail";
import "./CharacterDetail.css";

export default function CharacterDetail() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CHARACTER_DETAIL, {
    variables: {
      search: id,
    },
  });
  const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    // Load favorite IDs from local storage
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
      setFavoriteIds(favorites);
    }
  }, []);

  const addToFavorites = () => {
    if (data?.character) {
      console.log(id)
      setFavoriteIds((prevIds) => [...prevIds, id]);
      localStorage.setItem("favorites", JSON.stringify([...favoriteIds, id]));
    }
  };

  if (loading) return <h1>Loading...</h1>;
  else if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="character-detail-container">
      <h1 className="title">Rick and Morty Character Database - Character Detail</h1>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/')}>Home</button>
        <button className="button" onClick={() => navigate('/Search')}>Search</button>
        <button className="button" onClick={() => navigate('/Favorites')}>Favorites</button>
      </div>
      <div className="character-info-container">
        <img className="character-image" src={data.character.image} alt={data.character.name} />
        <div className="character-details-container">
          <h3 className="character-detail">Name: {data.character.name}</h3>
          <h3 className="character-detail">Status: {data.character.status}</h3>
          <h3 className="character-detail">Species: {data.character.species}</h3>
          <h3 className="character-detail">Type: {data.character.type}</h3>
          <h3 className="character-detail">Gender: {data.character.gender}</h3>
          <button className="add-favorite-button" onClick={addToFavorites}>Add to Favorites</button>
        </div>
      </div>
    </div>
  );
}