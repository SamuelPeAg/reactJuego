import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import GameDetails from './pages/GameDetails';
import Favorites from './pages/Favorites';
import PublisherSearch from './pages/PublisherSearch';
import PublisherDetails from './pages/PublisherDetails';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:type/:id" element={<Games />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/publishers" element={<PublisherSearch />} />
          <Route path="/publisher/:id" element={<PublisherDetails />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/mis-eventos" element={<MyEvents />} />
        </Routes>
      </main>
      <Footer />
    </Router >
  );
}

export default App;
