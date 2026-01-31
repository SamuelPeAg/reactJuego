import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGameDetails } from '../services/rawg';

function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

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

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando detalles...</div>;
    if (!game) return <div style={{ padding: '2rem', textAlign: 'center' }}>Juego no encontrado</div>;

    return (
        <>
            <div className="hero" style={{
                height: '60vh',
                backgroundImage: `linear-gradient(to top, var(--bg-dark), transparent), url(${game.background_image})`,
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
                    alignItems: 'flex-end'
                }}>
                    <div className="animate-enter">
                        <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{game.name}</h1>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.2rem', background: '#fff', color: '#000', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                                {game.rating} / 5
                            </span>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                style={{ background: isFavorite ? 'red' : 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)' }}
                            >
                                {isFavorite ? '❤️ Favorito' : '🤍 Añadir a Favoritos'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
                <div>
                    <h2>Sobre el juego</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: game.description }}
                        style={{ lineHeight: '1.8', color: 'var(--text-muted)' }}
                    />
                </div>

                <div className="glass-panel" style={{ padding: '2rem', height: 'fit-content' }}>
                    <h3 style={{ marginTop: 0 }}>Información</h3>

                    <p><strong>Fecha de lanzamiento:</strong> <br /> {game.released}</p>

                    <p><strong>Géneros:</strong> <br />
                        {game.genres?.map(g => g.name).join(', ')}
                    </p>

                    <p><strong>Plataformas:</strong> <br />
                        {game.platforms?.map(p => p.platform.name).join(', ')}
                    </p>

                    <p><strong>Website:</strong> <br />
                        <a href={game.website} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Visitar sitio oficial</a>
                    </p>
                </div>
            </div>
        </>
    );
}

export default GameDetails;
