import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pokedex.css';


function PokedexPage() {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonColors, setPokemonColors] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const limit = 10;

    const colorMap = {
        red: 'rgba(239, 83, 80, 0.2)',
        blue: 'rgba(66, 165, 245, 0.2)',
        green: 'rgba(102, 187, 106, 0.2)',
        yellow: 'rgba(255, 235, 59, 0.2)',
        purple: 'rgba(171, 71, 188, 0.2)',
        brown: 'rgba(161, 136, 127, 0.2)',
        pink: 'rgba(244, 143, 177, 0.2)',
        gray: 'rgba(158, 158, 158, 0.2)',
        white: 'rgba(250, 250, 250, 0.5)',
        black: 'rgba(33, 33, 33, 0.2)',
    };


    useEffect(() => {
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
            .then(res => res.json())
            .then(data => {
                const fetches = data.results.map(p => fetch(p.url).then(res => res.json()));
                Promise.all(fetches).then(pokemonData => {
                    setPokemon(pokemonData);

                    const speciesFetches = pokemonData.map(p =>
                        fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.id}`)
                            .then(res => res.json())
                            .then(speciesData => ({
                                id: p.id,
                                color: speciesData.color.name,
                            }))
                    );

                    Promise.all(speciesFetches).then(colors => {
                        const colorMap = {};
                        colors.forEach(c => {
                            colorMap[c.id] = { color: c.color };
                        });
                        setPokemonColors(colorMap);
                        setLoading(false);
                    });
                });
            });
    }, [offset]);

    return (
        <div className="container">
            <div className="header">
                <h1>Pokédex</h1>
            </div>

            {loading ? (
                <div className="loading">Loading Pokémon...</div>
            ) : (
                <>
                    <div className="pokemon-list">
                        {pokemon.map(p => (
                            <Link to={`/pokemon/${p.id}`} className="pokemon" style={{ backgroundColor: colorMap[pokemonColors[p.id]?.color] }}>
                                <div className="pokemon-data">
                                    <p className="pokemon-id">#{p.id}</p>
                                    <p className="pokemon-name">{p.name}</p>
                                </div>
                                <img src={p.sprites.front_default} alt={p.name} />
                            </Link>
                        ))}
                    </div>

                    <div className="buttons-layout">
                        <button className="button" onClick={() => setOffset(prev => Math.max(0, prev - limit))} disabled={offset === 0}>&lt;</button>
                        <button className="button" onClick={() => setOffset(0)}>Start</button>
                        <button className="button" onClick={() => setOffset(prev => prev + limit)}>&gt;</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PokedexPage;  