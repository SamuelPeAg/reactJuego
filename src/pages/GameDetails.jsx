import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getGameDetails } from '../services/rawg';
import { useFavorites } from '../hooks/useFavorites';

function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getGameDetails(id);
                setGame(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="page-container text-center">
            <h1 className="animate-pulse">Sincronizando con los servidores...</h1>
        </div>
    );

    if (!game) return (
        <div className="page-container text-center">
            <h1>Videojuego no encontrado</h1>
            <Link to="/games" className="btn-nova mt-medium">VOLVER AL CATÁLOGO</Link>
        </div>
    );

    const favorited = isFavorite(game.id);

    const toggleFavorite = () => {
        if (favorited) {
            removeFavorite(game.id);
        } else {
            addFavorite(game);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Immersive Header */}
            <div style={{ position: 'relative', height: '85vh', width: '100%', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${game.background_image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transform: 'scale(1.05)'
                    }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 80%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.2), transparent 70%)' }} />

                <div className="page-container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '6rem', paddingTop: 0 }}>
                    <div className="animate-in w-full">

                        <div className="flex items-center gap-8 flex-wrap" style={{ marginBottom: '2.5rem' }}>
                            {game.genres?.map(g => (
                                <Link
                                    key={g.id}
                                    to={`/games/genre/${g.slug}`}
                                    style={{
                                        fontSize: '0.75rem',
                                        fontWeight: '800',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em',
                                        color: 'var(--accent-secondary)',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {g.name}
                                </Link>
                            ))}
                        </div>

                        <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>{game.name}</h1>

                        <div className="flex items-center gap-8">
                            <div style={{ background: 'white', color: 'black', padding: '0.5rem 1.5rem', borderRadius: '4px', fontWeight: '900', fontSize: '1.25rem' }}>
                                {game.rating.toFixed(1)}
                            </div>

                            <button
                                onClick={toggleFavorite}
                                className={`btn-nova ${favorited ? '' : 'primary'}`}
                                style={{ minWidth: '280px', height: '60px' }}
                            >
                                {favorited ? 'QUITAR DE MI COLECCIÓN' : 'AÑADIR A MI COLECCIÓN'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '5rem', paddingTop: '4rem' }}>
                <div className="animate-in" style={{ animationDelay: '0.2s' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>SINOPSIS</h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                        style={{ lineHeight: '2', color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'justify' }}
                    />

                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '2rem', borderLeft: '4px solid var(--accent-secondary)', paddingLeft: '1.5rem' }}>ETIQUETAS</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {game.tags?.map(tag => (
                                <Link
                                    key={tag.id}
                                    to={`/games/tag/${tag.slug}`}
                                    className="btn-nova"
                                    style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
                                >
                                    #{tag.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="animate-in" style={{ animationDelay: '0.4s' }}>
                    <div className="glass-panel" style={{ padding: '3rem' }}>
                        <div style={{ marginBottom: '3rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: '800', opacity: 0.6 }}>LANZAMIENTO</span>
                            <p style={{ color: 'white', fontSize: '1.25rem', marginTop: '0.75rem', fontWeight: '600' }}>{game.released}</p>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: '800', opacity: 0.6 }}>PLATAFORMAS</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: '1.2rem' }}>
                                {game.platforms?.map(p => (
                                    <span key={p.platform.id} className="btn-nova" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', cursor: 'default' }}>
                                        {p.platform.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: '800', opacity: 0.6 }}>EDITORES (PUBLISHERS)</span>
                            <div style={{ marginTop: '1.2rem' }}>
                                {game.publishers?.map(pub => (
                                    <Link
                                        key={pub.id}
                                        to={`/publisher/${pub.id}`}
                                        style={{ color: 'white', fontSize: '1.1rem', display: 'block', textDecoration: 'none', marginBottom: '0.75rem' }}
                                    >
                                        &bull; {pub.name}
                                    </Link>
                                )) || <p style={{ color: 'white', fontSize: '1.1rem', marginTop: '1.2rem' }}>Desconocido</p>}
                            </div>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: '800', opacity: 0.6 }}>DESARROLLADOR</span>
                            <p style={{ color: 'white', fontSize: '1.1rem', marginTop: '1rem' }}>
                                {game.developers?.map(d => d.name).join(', ') || 'Desconocido'}
                            </p>
                        </div>

                        {game.website && (
                            <a href={game.website} target="_blank" rel="noreferrer" className="btn-nova primary" style={{ width: '100%', justifyContent: 'center' }}>
                                WEB OFICIAL
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;
