import { useState, useEffect } from 'react';
import { getPopularGames } from '../services/rawg';
import { Link } from 'react-router-dom';

function Carousel() {
    const [games, setGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getPopularGames();
                setGames(data.results.slice(0, 5));
            } catch (error) {
                console.error('Failed to fetch carousel games', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % games.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
    };

    if (loading) return <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando...</div>;
    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div style={{ position: 'relative', height: '80vh', width: '100%', overflow: 'hidden', marginBottom: '4rem' }}>

            {/* Background Image */}
            <div
                key={currentGame.id}
                style={{
                    backgroundImage: `url(${currentGame.background_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    inset: 0,
                    transition: 'all 1s ease',
                    transform: 'scale(1.05)'
                }}
            >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #030303 10%, transparent 80%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #030303 0%, transparent 60%)' }} />
            </div>

            <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}>
                <div style={{ maxWidth: '800px', padding: '2rem' }}>
                    <span className="badge badge-rating" style={{ marginBottom: '1.5rem' }}>DESTACADO</span>

                    <h1 style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: '1', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {currentGame.name}
                    </h1>

                    <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem', color: '#ccc' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>★ {currentGame.rating.toFixed(1)}</span>
                        <span>•</span>
                        <span>{currentGame.released?.split('-')[0]}</span>
                        {currentGame.genres?.slice(0, 2).map(g => (
                            <span key={g.id} className="badge" style={{ marginLeft: '1rem' }}>{g.name}</span>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Link to={`/game/${currentGame.id}`} className="btn btn-primary">
                            VER DETALLES
                        </Link>
                        <button onClick={nextSlide} className="btn btn-secondary">
                            SIGUIENTE
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Carousel;
