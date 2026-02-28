import { useSelector } from 'react-redux';
import GameCard from '../components/GameCard';
import { Link } from 'react-router-dom';

function Favorites() {
    const { favorites } = useSelector((state) => state.games);

    return (
        <div className="page-container">
            <div className="animate-in" style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>TU BIBLIOTECA</h2>
                <h1 className="text-gradient">MIS FAVORITOS</h1>
            </div>


            {favorites.length === 0 ? (
                <div className="glass-panel animate-in" style={{ padding: '8rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>🌑</div>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>Aún no has añadido nada a tu colección personal.</p>
                    <Link to="/games" className="btn-nova primary">
                        EXPLORAR JUEGOS
                    </Link>
                </div>
            ) : (
                <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {favorites.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
