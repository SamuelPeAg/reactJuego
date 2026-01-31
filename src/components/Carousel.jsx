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

    if (loading) return <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>Loading...</div>;
    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="carousel-container" style={{ position: 'relative', height: '600px', borderRadius: '4px', overflow: 'hidden', marginBottom: '4rem' }}>
            <div
                className="carousel-slide"
                style={{
                    backgroundImage: `linear-gradient(to top, var(--bg-main), transparent 80%), url(${currentGame.background_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '4rem'
                }}
            >
                <div className="animate-enter" style={{ maxWidth: '800px' }}>
                    <h2 style={{ fontSize: '4rem', margin: '0 0 1rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{currentGame.name}</h2>
                    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{currentGame.rating.toFixed(1)} Rating</span>
                        <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{currentGame.released}</span>
                    </div>
                    <Link to={`/game/${currentGame.id}`}>
                        <button>DETAILS</button>
                    </Link>
                </div>
            </div>

            <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
                <button className="secondary" onClick={prevSlide} style={{ padding: '0.5rem 1rem' }}>PREV</button>
                <button className="secondary" onClick={nextSlide} style={{ padding: '0.5rem 1rem' }}>NEXT</button>
            </div>
        </div>
    );
}

export default Carousel;
