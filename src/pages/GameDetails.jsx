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

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading details...</div>;
    if (!game) return <div style={{ padding: '4rem', textAlign: 'center' }}>Game not found.</div>;

    const favorited = isFavorite(game.id);

    const toggleFavorite = () => {
        if (favorited) {
            removeFavorite(game.id);
        } else {
            addFavorite(game);
        }
    };

    return (
        <>
            <div className="hero" style={{
                height: '70vh',
                backgroundImage: `linear-gradient(to top, var(--bg-main), transparent 90%), url(${game.background_image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}>
                <div className="container" style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '2rem',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    paddingBottom: '4rem'
                }}>
                    <div className="animate-enter" style={{ width: '100%' }}>
                        <h1 style={{ fontSize: '5rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{game.name}</h1>
                        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', background: 'white', color: 'black', padding: '0.3rem 0.8rem', fontWeight: '700' }}>
                                {game.rating.toFixed(1)}
                            </span>
                            <button
                                onClick={toggleFavorite}
                                style={{
                                    background: favorited ? 'transparent' : 'white',
                                    color: favorited ? 'white' : 'black',
                                    border: '1px solid white',
                                    minWidth: '180px'
                                }}
                            >
                                {favorited ? 'REMOVE FROM LIBRARY' : 'ADD TO LIBRARY'}
                            </button>
                            {game.website && (
                                <a href={game.website} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'var(--text-primary)' }}>
                                    Official Website
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
                <div>
                    <h3 style={{ borderBottom: '1px solid var(--text-tertiary)', paddingBottom: '1rem', marginBottom: '2rem' }}>About</h3>
                    <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                        style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem' }}
                    />
                </div>

                <div style={{ borderLeft: '1px solid var(--text-tertiary)', paddingLeft: '2rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Released</h4>
                        <p style={{ color: 'var(--text-primary)', margin: 0 }}>{game.released}</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Genres</h4>
                        <p style={{ color: 'var(--text-primary)', margin: 0 }}>{game.genres?.map(g => g.name).join(', ')}</p>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Platforms</h4>
                        <p style={{ color: 'var(--text-primary)', margin: 0 }}>{game.platforms?.map(p => p.platform.name).join(', ')}</p>
                    </div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Publisher</h4>
                        <p style={{ color: 'var(--text-primary)', margin: 0 }}>{game.publishers?.map(p => p.name).join(', ')}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GameDetails;
