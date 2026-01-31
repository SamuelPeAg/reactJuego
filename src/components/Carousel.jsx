import { useState, useEffect } from 'react';
import { getPopularGames } from '../services/rawg';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Loader from './ui/Loader';
import Badge from './ui/Badge';

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

    if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader /></div>;
    if (games.length === 0) return null;

    const currentGame = games[currentIndex];

    return (
        <div className="relative h-[75vh] w-full overflow-hidden mb-12 group">
            {/* Background Image with Transition */}
            <div
                key={currentGame.id}
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
                style={{ backgroundImage: `url(${currentGame.background_image})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />
            </div>

            <div className="relative h-full container flex flex-col justify-center px-12">
                <div className="max-w-3xl animate-fade-in space-y-6">
                    <Badge variant="default" className="pulsing-badge">Destacado</Badge>
                    <h1 className="text-7xl font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                        {currentGame.name}
                    </h1>

                    <div className="flex items-center gap-6 text-lg">
                        <Badge variant="rating" className="text-xl px-4 py-1">{currentGame.rating.toFixed(1)}</Badge>
                        <span className="text-gray-300 font-light tracking-widest">{currentGame.released?.split('-')[0]}</span>
                        {currentGame.genres?.slice(0, 2).map((g, i) => (
                            <span key={i} className="text-gray-400 uppercase text-sm tracking-widest font-semibold px-2 border-l border-white/20">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="pt-8 flex gap-4">
                        <Link to={`/game/${currentGame.id}`}>
                            <Button variant="primary" className="px-8 py-4 text-lg">Ver Detalles</Button>
                        </Link>
                        <Button variant="secondary" className="px-8 py-4 text-lg" onClick={nextSlide}>
                            Siguiente Juego
                        </Button>
                    </div>
                </div>
            </div>

            {/* Navigation Indicators */}
            <div className="absolute bottom-12 right-12 flex gap-4 z-20">
                {games.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-1 transition-all duration-300 ${idx === currentIndex ? 'w-12 bg-white' : 'w-4 bg-white/30 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Carousel;
