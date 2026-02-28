import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGamesThunk } from '../features/games/gamesThunks';
import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function Games() {
    const { type, id } = useParams(); // type can be 'genre' or 'tag'
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;
    const genreParam = searchParams.get('genre') || '';

    const dispatch = useDispatch();
    const { games, loading, totalPages } = useSelector((state) => state.games);
    const [search, setSearch] = useState('');

    useEffect(() => {
        let genres = genreParam;
        let tags = '';

        if (type === 'genre') genres = id;
        if (type === 'tag') tags = id;

        dispatch(fetchGamesThunk({ search, page, genres, tags, publishers: '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, search, page, type, id, genreParam]);

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
