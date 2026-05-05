import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Sobre from './pages/Sobre/Sobre';
import Contato from './pages/Contato/Contato';
import Gerenciador from './components/listagem';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>MAKALSTORE</h1>
      <nav className='menu'>
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="./Gerenciador">Gerenciador de Produtos</Link>
        <Link to="/contato">Contato</Link>
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

export default App

