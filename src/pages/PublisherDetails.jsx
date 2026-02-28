import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPublisherDetails, getGames } from '../services/gamesService';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';

function PublisherDetails() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;

    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPublisherData = async () => {
            setLoading(true);
            try {
                const [pubData, gamesData] = await Promise.all([
                    getPublisherDetails(id),
                    getGames('', page, '', '', id)
                ]);
                setPublisher(pubData);
                setGames(gamesData.results);
                setTotalPages(Math.ceil(gamesData.count / 20));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublisherData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id, page]);

    if (loading && !publisher) return (
        <div className="page-container text-center">
            <h1 className="animate-pulse">Cargando Publisher...</h1>
        </div>
    );

    if (!publisher) return (
        <div className="page-container text-center">
            <h1>No se encontró el publisher</h1>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)' }}>
            {/* Immersive Header */}
            <div style={{ position: 'relative', height: '60vh', width: '100%', overflow: 'hidden' }}>
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${publisher.image_background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 80%)' }} />

                <div className="page-container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem', paddingTop: 0 }}>
                    <div className="animate-in">
                        <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-secondary)', marginBottom: '1rem' }}>
                            EDITOR / PUBLISHER
                        </h2>
                        <h1 className="text-gradient">{publisher.name}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem', maxWidth: '800px' }}>
                            {publisher.games_count} videojuegos lanzados en total.
                        </p>
                    </div>
                </div>
            </div>

            <div className="page-container" style={{ paddingTop: '4rem' }}>
                <div className="animate-in" style={{ marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '1.5rem' }}>
                        OBRAS PUBLICADAS POR {publisher.name.toUpperCase()}
                    </h3>

                    <div style={{
                        dangerouslySetInnerHTML: { __html: publisher.description },
                        lineHeight: '1.8',
                        color: 'var(--text-muted)',
                        fontSize: '1.1rem',
                        marginBottom: '4rem'
                    }} />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {games.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>

                    <Pagination totalPages={totalPages} />
                </div>
            </div>
        </div>
    );
}

export default PublisherDetails;
