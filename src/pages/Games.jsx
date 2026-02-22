import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { getGames } from '../services/rawg';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function Games() {
    const { type, id } = useParams(); // type can be 'genre' or 'tag'
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const genreParam = searchParams.get('genre') || '';

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);

    const fetchGamesData = async () => {
        setLoading(true);
        try {
            let genres = genreParam;
            let tags = '';

            if (type === 'genre') genres = id;
            if (type === 'tag') tags = id;

            const data = await getGames(search, page, genres, tags);
            setGames(data.results);
            setTotalPages(Math.ceil(data.count / 20));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGamesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, page, type, id, genreParam]);

    const getTitle = () => {
        if (type === 'genre') return `GÉNERO: ${id.replace('-', ' ').toUpperCase()}`;
        if (type === 'tag') return `ETIQUETA: ${id.replace('-', ' ').toUpperCase()}`;
        if (genreParam) return `GÉNERO: ${genreParam.toUpperCase()}`;
        return 'CATÁLOGO GLOBAL';
    };

    const getSubtitle = () => {
        if (type || genreParam) return 'FILTRANDO EL UNIVERSO';
        return 'EXPLORA EL UNIVERSO';
    };

    return (
        <div className="page-container">
            <div className="animate-in" style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
                    {getTitle()}
                </h2>
                <h1 className="text-gradient" style={{ marginBottom: '3rem' }}>
                    {getSubtitle()}
                </h1>

                <SearchBar value={search} onChange={setSearch} loading={loading} />
            </div>

            {loading ? (
                <div className="text-center" style={{ padding: '10rem' }}>
                    <h2 style={{ opacity: 0.5 }}>Analizando datos estelares...</h2>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                        {games.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>

                    {games.length === 0 && (
                        <div className="text-center glass-panel" style={{ padding: '6rem' }}>
                            <h2 style={{ opacity: 0.5 }}>No se encontraron videojuegos</h2>
                        </div>
                    )}

                    <Pagination totalPages={totalPages} />
                </>
            )}
        </div>
    );
}

export default Games;
