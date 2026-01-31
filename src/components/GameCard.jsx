import { Link } from 'react-router-dom';

function GameCard({ game }) {
    if (!game) return null;

    return (
        <Link to={`/game/${game.id}`} style={{ display: 'block' }}>
            <div className="card-glass" style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '240px' }}>
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="bg-cover"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                    <span className="badge badge-rating" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        {game.rating.toFixed(1)}
                    </span>
                </div>

                <div className="card-content">
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {game.name}
                    </h3>
                    <div className="flex justify-center" style={{ justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <span>{game.released?.split('-')[0] || 'TBA'}</span>
                        <div className="flex gap-4" style={{ gap: '0.5rem' }}>
                            {game.parent_platforms?.slice(0, 3).map(p => (
                                <span key={p.platform.id} style={{ textTransform: 'uppercase' }}>
                                    {p.platform.name.slice(0, 3)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default GameCard;
