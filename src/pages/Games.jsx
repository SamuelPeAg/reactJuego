import { useState, useEffect } from 'react';
import { getGames } from '../services/rawg';
import GameCard from '../components/GameCard';

function Games() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchGames = async (query = '') => {
        setLoading(true);
        try {
            const data = await getGames(query);
            setGames(data.results);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchGames(search);
    };

    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Explorar Juegos</h1>

            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem' }}>
                <input
                    type="text"
                    placeholder="Buscar juegos (ej: GTA V, Mario...)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="glass-panel"
                    style={{
                        width: '100%',
                        maxWidth: '500px',
                        padding: '1rem',
                        color: 'white',
                        fontSize: '1rem',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                />
                <button type="submit">Buscar</button>
            </form>

            {loading ? (
                <div style={{ textAlign: 'center' }}>Buscando...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}

            {!loading && games.length === 0 && <p style={{ textAlign: 'center' }}>No se encontraron juegos.</p>}
        </div>
    );
}

export default Games;
