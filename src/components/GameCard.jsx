import { Link } from 'react-router-dom';

function GameCard({ game }) {
    return (
        <Link to={`/game/${game.id}`} className="glass-panel" style={{
            display: 'block',
            textDecoration: 'none',
            overflow: 'hidden',
            color: 'inherit',
            transition: 'transform 0.2s'
        }}>
            <div style={{
                height: '200px',
                backgroundImage: `url(${game.background_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }} />
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>{game.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                        background: 'var(--primary-dark)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: 'var(--primary)'
                    }}>
                        ⭐ {game.rating}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {game.released?.split('-')[0]}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default GameCard;
