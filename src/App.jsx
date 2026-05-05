import { Link, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home/home';
import Sobre from './pages/Sobre/Sobre';
import Contato from './pages/Contato/Contato';
import Gerenciador from './components/listagem';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>MAKALSTORE</h1>
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
          <Link to="/Gerenciador" onClick={() => setMenuOpen(false)}>Gerenciador de Produtos</Link>
          <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/Gerenciador" element={<Gerenciador />} />
        </Routes>
      </main>

      <footer>
        <h1>©MAKALSTORE . Todos os direitos reservados.</h1>
      </footer>
    </div>
  )
}

export default App;
