import { useState, useEffect, useCallback } from 'react';
import { getPopularGames } from '../services/rawg';
import { useNavigate } from 'react-router-dom';

function Carousel() {
    const [games, setGames] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchGames = useCallback(async () => {
        try {
            const data = await getPopularGames();
            setGames(data.results.slice(0, 5));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGames();
    }, [fetchGames]);

    useEffect(() => {
        if (games.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % games.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [games.length]);

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % games.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
    };

    const goToGame = () => {
        navigate(`/game/${games[currentIndex].id}`);
    };

    if (loading) return (
        <div className="page-container" style={{ paddingTop: 0 }}>
            <div style={{ height: '80vh', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', animate: 'pulse 2s infinite' }}></div>
        </div>
    );

    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div
            className="animate-in"
            onClick={goToGame}
            style={{
                position: 'relative',
                height: '85vh',
                width: '100%',
                overflow: 'hidden',
                borderRadius: '40px',
                marginBottom: '8rem',
                cursor: 'pointer',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)'
            }}
        >
            {/* Background Layers */}
            {games.map((game, index) => (
                <div
                    key={game.id}
                    style={{
                        backgroundImage: `url(${game.background_image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'absolute',
                        inset: 0,
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 1.2s ease-in-out, transform 10s linear',
                        transform: index === currentIndex ? 'scale(1.1)' : 'scale(1)',
                        zIndex: index === currentIndex ? 1 : 0
                    }}
                >
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--bg-dark) 0%, transparent 70%)' }} />
                </div>
            ))}

            <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', padding: '0 6rem', zIndex: 10 }}>
                <div style={{ maxWidth: '900px' }}>
                    <div className="flex items-center gap-4" style={{ marginBottom: '2.5rem' }}>
                        <span style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: '6px',
                            background: 'white',
                            color: 'black',
                            fontWeight: '900',
                            fontSize: '0.8rem',
                            letterSpacing: '0.1em'
                        }}>DESTACADO</span>
                        <span style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3rem', fontSize: '0.75rem', fontWeight: '700' }}>TENDENCIA GLOBAL</span>
                    </div>

                    <h1 className="text-gradient" style={{ marginBottom: '2.5rem', textShadow: '0 20px 40px rgba(0,0,0,0.5)', fontSize: '5rem' }}>
                        {currentGame.name}
                    </h1>

                    <div className="flex items-center gap-10" style={{ marginBottom: '4rem' }}>
                        <div className="flex flex-col">
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em' }}>Calificación</span>
                            <span style={{ fontSize: '2rem', fontWeight: '800' }}>{currentGame.rating.toFixed(1)} <span style={{ fontSize: '1rem', opacity: 0.5 }}>/ 5.0</span></span>
                        </div>
                        <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.15)' }} />
                        <div className="flex flex-col">
                            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.1em' }}>Estreno</span>
                            <span style={{ fontSize: '2rem', fontWeight: '800' }}>{currentGame.released?.split('-')[0]}</span>
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <button className="btn-nova primary" style={{ scale: '1.1' }}>
                            VER DETALLES
                        </button>
                        <div className="flex gap-3">
                            <button onClick={prevSlide} className="btn-nova" style={{ padding: '1rem' }}>
                                ←
                            </button>
                            <button onClick={nextSlide} className="btn-nova" style={{ padding: '1rem' }}>
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div style={{ position: 'absolute', bottom: '4rem', right: '6rem', display: 'flex', gap: '0.75rem', zIndex: 20 }}>
                {games.map((_, i) => (
                    <div
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                        style={{
                            width: i === currentIndex ? '60px' : '10px',
                            height: '6px',
                            background: i === currentIndex ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                            borderRadius: '99px',
                            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                            cursor: 'pointer'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;

