import GameCard from '../components/GameCard';
import { useFavorites } from '../hooks/useFavorites';

function Favorites() {
    const { favorites } = useFavorites();

    return (
        <div className="container" style={{ padding: '4rem 2rem' }}>
            <h1 style={{ marginBottom: '3rem' }}>Mis Colección</h1>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed var(--text-tertiary)', borderRadius: '8px' }}>
                    <p>Tu colección está vacía.</p>
                    <a href="/games" style={{ textDecoration: 'underline' }}>Explorar catálogo</a>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {favorites.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favorites;
