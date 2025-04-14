import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/pokemonPage.css';

function PokemonPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, [id]);

  if (!pokemon) return <div className="container">Loading...</div>;

  return (
    <div className="container-pokemon">
      <h1>{pokemon.name} #{pokemon.id}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
      <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>

      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default PokemonPage;
