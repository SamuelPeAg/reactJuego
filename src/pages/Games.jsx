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

    // Initial load and search
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

    // Search handler
    useEffect(() => {
        // Reset state when search changes
        setPage(1);
        setHasMore(true);
        setGames([]); // Clear current games
        fetchGames(search, 1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Infinite Scroll Observer
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
        <div className="container" style={{ padding: '4rem 2rem' }}>

            <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-minimal"
                    style={{ maxWidth: '600px', textAlign: 'center' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>

            {/* Scroll Trigger */}
            <div ref={observerTarget} style={{ height: '50px', marginTop: '2rem', textAlign: 'center', opacity: 0.5 }}>
                {loading && <span>Loading more...</span>}
            </div>

            {!loading && games.length === 0 && <p style={{ textAlign: 'center' }}>No results found.</p>}
        </div>
    );
}

export default Games;
