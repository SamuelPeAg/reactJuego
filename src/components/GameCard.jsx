import { Link } from 'react-router-dom';

function GameCard({ game }) {
    if (!game) return null;

    return (
        <Link to={`/game/${game.id}`} style={{ display: 'block', textDecoration: 'none' }} className="animate-in">
            <div className="glass-panel overflow-hidden relative group" style={{ height: '100%' }}>
                <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="h-full w-full obj-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }} />

                    <div className="absolute top-4 right-4" style={{
                        background: 'rgba(255,255,255,0.9)',
                        color: 'black',
                        padding: '0.3rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '900'
                    }}>
                        {game.rating.toFixed(1)}
                    </div>
                </div>

                <div className="p-6">
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'white', fontWeight: '800' }}>
                        {game.name}
                    </h3>

                    <div className="flex justify-between items-center">
                        <span style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem', fontWeight: '900', letterSpacing: '0.05em' }}>
                            {game.released?.split('-')[0] || 'TBA'}
                        </span>

                        <div className="flex gap-2">
                            {(game.parent_platforms || game.platforms)?.slice(0, 3).map(p => (
                                <span key={p.platform.id} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', opacity: 0.8 }}>
                                    {p.platform.name.slice(0, 3)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Accent glow line at bottom */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '0%', height: '2px',
                    background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                    transition: 'width 0.4s ease'
                }} className="group-hover:w-full" />
            </div>
        </Link>
    );
}

export default GameCard;
