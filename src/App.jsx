import { Routes, Route, Link } from 'react-router-dom';
import PokedexPage from './pages/PokedexPage';
import AboutPage from './pages/AboutPage';
import PokemonPage from './components/PokemonPage';
import './styles/app.css';

function App() {
  return (
    <>
      <nav>
        <Link to="/pokedex">Pokédex</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </>
  );
}

export default App;
