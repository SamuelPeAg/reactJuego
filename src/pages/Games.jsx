import { useState, useEffect, useRef } from 'react';
import { getGames } from '../services/rawg';
import GameCard from '../components/GameCard';

function Games() {
    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observerTarget = useRef(null);

    const fetchGames = async (query = '', pageNum = 1, shouldReplace = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await getGames(query, pageNum);
            if (data.results.length === 0) setHasMore(false);

            setGames(prev => shouldReplace ? data.results : [...prev, ...data.results]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        setHasMore(true);
        setGames([]);
        fetchGames(search, 1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading && games.length > 0) {
                    setPage(prev => {
                        const nextPage = prev + 1;
                        fetchGames(search, nextPage, false);
                        return nextPage;
                    });
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current);
        };
    }, [hasMore, loading, search, games.length]);


    return (
        <div className="page-layout">

            <div className="container" style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ marginBottom: '2rem' }}>EXPLORAR JUEGOS</h1>
                <input
                    type="text"
                    placeholder="Busca tu próximo juego favorito..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field"
                    style={{ maxWidth: '600px', textAlign: 'center' }}
                />
            </div>

            <div className="container h-full">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {games.map(game => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>

            {/* Scroll Trigger */}
            <div ref={observerTarget} style={{ height: '50px', marginTop: '2rem', textAlign: 'center', opacity: 0.5 }}>
                {loading && <span>Cargando más...</span>}
            </div>

            {!loading && games.length === 0 && <p style={{ textAlign: 'center' }}>No se encontraron resultados.</p>}
        </div>
    );
}

export default Games;
