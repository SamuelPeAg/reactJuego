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
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % games.length);
    };

    if (loading) return <div style={{ height: '70vh', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}></div>;
    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="animate-in" style={{ position: 'relative', height: '80vh', width: '100%', overflow: 'hidden', borderRadius: '40px', marginBottom: '5rem' }}>

            {/* Background with zoom effect */}
            <div
                key={currentGame.id}
                style={{
                    backgroundImage: `url(${currentGame.background_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    inset: 0,
                    transition: 'transform 10s linear',
                    transform: 'scale(1.1)'
                }}
            >
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark), transparent 50%, rgba(0,0,0,0.4))' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-dark), transparent 80%)' }} />
            </div>

            <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', padding: '0 4rem' }}>
                <div style={{ maxWidth: '900px' }}>
                    <div className="flex items-center gap-4" style={{ marginBottom: '2rem' }}>
                        <span style={{
                            padding: '0.4rem 1rem',
                            borderRadius: '4px',
                            background: 'white',
                            color: 'black',
                            fontWeight: '900',
                            fontSize: '0.75rem'
                        }}>TOP RATED</span>
                        <span style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '0.2rem', fontSize: '0.75rem', fontWeight: '600' }}>TRENDING NOW</span>
                    </div>

                    <h1 className="text-gradient" style={{ marginBottom: '2rem', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                        {currentGame.name}
                    </h1>

                    <div className="flex items-center gap-6" style={{ marginBottom: '3rem' }}>
                        <div className="flex flex-col">
                            <span style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>Rating</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>{currentGame.rating.toFixed(1)} / 5.0</span>
                        </div>
                        <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.1)' }} />
                        <div className="flex flex-col">
                            <span style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>Lanzamiento</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: '700' }}>{currentGame.released?.split('-')[0]}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link to={`/game/${currentGame.id}`} className="btn-nova primary">
                            Ver Detalles
                        </Link>
                        <button onClick={nextSlide} className="btn-nova">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div style={{ position: 'absolute', bottom: '3rem', right: '4rem', display: 'flex', gap: '0.5rem' }}>
                {games.map((_, i) => (
                    <div key={i} style={{
                        width: i === currentIndex ? '40px' : '8px',
                        height: '4px',
                        background: i === currentIndex ? 'white' : 'rgba(255,255,255,0.2)',
                        borderRadius: '99px',
                        transition: 'all 0.4s ease'
                    }} />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
