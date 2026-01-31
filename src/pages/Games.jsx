import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getGames } from '../services/rawg';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';

function Games() {
    const [searchParams] = useSearchParams();
    const genreParam = searchParams.get('genre') || '';

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
            const data = await getGames(query, pageNum, genreParam);
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
    }, [search, genreParam]);

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
        <div className="page-container">

            <div className="animate-in" style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
                    {genreParam ? `GÉNERO: ${genreParam.toUpperCase()}` : 'CATÁLOGO GLOBAL'}
                </h2>
                <h1 className="text-gradient" style={{ marginBottom: '3rem' }}>
                    {genreParam ? 'FILTRANDO EL UNIVERSO' : 'EXPLORA EL UNIVERSO'}
                </h1>

                <SearchBar value={search} onChange={setSearch} loading={loading} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            <div ref={observerTarget} style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {loading && <p style={{ fontSize: '1.5rem', opacity: 0.5 }}>Cargando...</p>}
            </div>

            {!loading && games.length === 0 && (
                <div className="text-center glass-panel" style={{ padding: '6rem' }}>
                    <h2 style={{ opacity: 0.5 }}>No se encontraron resultados</h2>
                </div>
            )}
        </div>
    );
}

export default Games;
