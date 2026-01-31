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
                setGames(data.results.slice(0, 5)); // Top 5
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

    if (loading) return <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cargando destacados...</div>;
    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="carousel-container" style={{ position: 'relative', height: '500px', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
            <div
                className="carousel-slide"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(${currentGame.background_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '3rem'
                }}
            >
                <div className="animate-enter">
                    <h2 style={{ fontSize: '3rem', margin: '0 0 1rem' }}>{currentGame.name}</h2>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <span className="glass-panel" style={{ padding: '0.5rem 1rem' }}>⭐ {currentGame.rating}</span>
                        <span className="glass-panel" style={{ padding: '0.5rem 1rem' }}>📅 {currentGame.released}</span>
                    </div>
                    <Link to={`/game/${currentGame.id}`}>
                        <button>Ver Detalles</button>
                    </Link>
                </div>
            </div>

            <button
                onClick={prevSlide}
                style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', borderRadius: '50%', width: '50px', height: '50px', padding: 0 }}
            >
                ❯
            </button>
        </div>
    );
}

export default Carousel;
