import { GET_ALL_CHARACTERS } from "../queries/GetAllCharacters";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function DisplayAll() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ALL_CHARACTERS, {
    variables: {
      page: id ? parseInt(id) : 1,
    },
  });

  const navigate = useNavigate();

  if (loading) return <h1>Loading...</h1>;
  else if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="container">
      <h1 className="title">Rick and Morty Character Database - Home</h1>
      <div className="menu">
        <button className="menu-btn active" onClick={() => navigate('/')}>Home</button>
        <button className="menu-btn" onClick={() => navigate('/Search')}>Search</button>
        <button className="menu-btn" onClick={() => navigate('/Favorites')}>Favorites</button>
      </div>
      <div className="grid">
        {data.characters.results.map((character) => (
          <Link key={character.id} to={`/CharacterDetail/${character.id}`}>
            <div
              key={character.id}
              className="card"
            >
              <img src={character.image} alt={character.name} />
              <h3>{character.name}</h3>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        {data.characters.info.prev && (
          <Link
            to={`/DisplayAll/${parseInt(id) - 1}`}
            className="page-btn"
          >
            Prev
          </Link>
        )}
        {data.characters.info.next && (
          <Link
            to={`/DisplayAll/${parseInt(id) + 1}`}
            className="page-btn"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}