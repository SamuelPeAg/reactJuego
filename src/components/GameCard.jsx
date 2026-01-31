import { Link } from 'react-router-dom';

function GameCard({ game }) {
    if (!game) return null;
    const year = game.released ? game.released.split('-')[0] : 'N/A';

    return (
        <Link to={`/game/${game.id}`} className="game-card" style={{ display: 'block', textDecoration: 'none' }}>
            <img src={game.background_image} alt={game.name} loading="lazy" />
            <div style={{ padding: '1.2rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{year}</span>
                    {game.rating > 0 && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                            {game.rating}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default GameCard;
