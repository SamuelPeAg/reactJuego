import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getPublishers } from '../services/gamesService';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function PublisherSearch() {
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page')) || 1;

    const [publishers, setPublishers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchPublishers = async () => {
            setLoading(true);
            try {
                const data = await getPublishers(search, page);
                setPublishers(data.results);
                setTotalPages(Math.ceil(data.count / 20)); // RAWG page size is usually 20
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchPublishers();
    }, [search, page]);

    return (
        <div className="page-container">
            <div className="animate-in" style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
                    DIRECTORIO DE LA INDUSTRIA
                </h2>
                <h1 className="text-gradient" style={{ marginBottom: '3rem' }}>
                    BUSCADOR DE PUBLISHERS
                </h1>
                <SearchBar value={search} onChange={setSearch} loading={loading} />
            </div>

            {loading ? (
                <div className="text-center" style={{ padding: '10rem' }}>
                    <h2 style={{ opacity: 0.5 }} className="animate-pulse">Sincronizando con la red...</h2>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {publishers.map(pub => (
                            <Link
                                key={pub.id}
                                to={`/publisher/${pub.id}`}
                                className="glass-panel group"
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ height: '240px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        src={pub.image_background || 'https://via.placeholder.com/400x200'}
                                        alt={pub.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                            transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                                        }}
                                        className="group-hover:scale-110"
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(2, 2, 2, 1) 0%, rgba(2, 2, 2, 0.5) 20%, transparent 100%)',
                                        zIndex: 1
                                    }} />
                                </div>
                                <div style={{
                                    padding: '2.5rem 2rem',
                                    flexGrow: 1,
                                    background: 'rgba(15, 15, 20, 0.95)',
                                    marginTop: '-2px', // Asegura solapamiento total
                                    position: 'relative',
                                    zIndex: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.8rem'
                                }}>
                                    <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.02em' }}>{pub.name}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>
                                        {pub.games_count} videojuegos publicados
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {publishers.length === 0 && (
                        <div className="text-center glass-panel" style={{ padding: '6rem' }}>
                            <h2 style={{ opacity: 0.5 }}>No se encontraron publishers</h2>
                        </div>
                    )}

                    <Pagination totalPages={totalPages} />
                </>
            )}
        </div>
    );
}

export default PublisherSearch;
