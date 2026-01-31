import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    }, [id]);

    if (loading) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Cargando detalles...</div>;
    if (!game) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Juego no encontrado.</div>;

    const favorited = isFavorite(game.id);

    const toggleFavorite = () => {
        if (favorited) {
            removeFavorite(game.id);
        } else {
            addFavorite(game);
        }
    };

    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Immersive Hero */}
            <div style={{
                height: '75vh',
                position: 'relative',
                marginBottom: '2rem'
            }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${game.background_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #030303 0%, transparent 100%)' }} />

                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem' }}>
                    <div style={{ width: '100%' }}>
                        <h1 style={{ fontSize: '5rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{game.name}</h1>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <span className="badge badge-rating" style={{ fontSize: '1.2rem', padding: '0.4rem 1rem' }}>
                                {game.rating.toFixed(1)}
                            </span>
                            <button
                                onClick={toggleFavorite}
                                className={favorited ? 'btn btn-secondary' : 'btn btn-primary'}
                                style={{ minWidth: '220px' }}
                            >
                                {favorited ? 'QUITAR DE FAVORITOS' : 'AÑADIR A FAVORITOS'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
                <div>
                    <h3 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '2rem' }}>Sobre el juego</h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                        style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}
                    />
                </div>

                <div className="card-glass" style={{ padding: '2rem', height: 'fit-content' }}>
                    <div className="mb-small">
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Lanzamiento</h4>
                        <p style={{ color: 'white', margin: 0 }}>{game.released}</p>
                    </div>

                    <div className="mb-small">
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Géneros</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {game.genres?.map(g => (
                                <span key={g.id} className="badge">{g.name}</span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-small">
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.875rem', textTransform: 'uppercase' }}>Plataformas</h4>
                        <p style={{ color: 'white', margin: 0 }}>{game.platforms?.map(p => p.platform.name).join(', ')}</p>
                    </div>

                    {game.website && (
                        <div style={{ marginTop: '2rem' }}>
                            <a href={game.website} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%' }}>
                                Visitar Web Oficial
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GameDetails;
