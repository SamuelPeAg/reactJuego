import Carousel from '../components/Carousel';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const genres = [
        { name: 'Acción', slug: 'action' },
        { name: 'Aventura', slug: 'adventure' },
        { name: 'RPG', slug: 'role-playing-games-rpg' },
        { name: 'Shooter', slug: 'shooter' },
        { name: 'Puzzle', slug: 'puzzle' },
        { name: 'Indie', slug: 'indie' }
    ];

    const handleGenreClick = (slug) => {
        navigate(`/games?genre=${slug}`);
    };

    return (
        <div className="page-container">
            <Carousel />

            <div className="animate-in mb-xl" style={{ animationDelay: '0.2s', paddingLeft: '4rem' }}>
                <h2 style={{ fontSize: '1rem', color: 'var(--accent-primary)', letterSpacing: '0.5em', marginBottom: '1.5rem', fontWeight: '800' }}>
                    EXPERIENCIA DEFINITIVA
                </h2>
                <h1 className="text-gradient" style={{ marginBottom: '3.5rem', fontSize: '5rem', maxWidth: '1000px' }}>
                    LA FRONTERA DE LO<br />POSIBLE EN EL GAMING
                </h1>
                <Link to="/games" className="btn-nova primary" style={{ transform: 'scale(1.2)', transformOrigin: 'left' }}>
                    EXPLORAR TODO EL CATÁLOGO
                </Link>
            </div>

            {/* Categorías (Ahora funcionales) */}
            <div className="animate-in" style={{ marginTop: '4rem', paddingLeft: '2rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '800', letterSpacing: '0.2em' }}>NAVEGACIÓN</span>
                <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '3rem' }}>EXPLORA POR GÉNERO</h2>

                <div className="flex gap-4 flex-wrap">
                    {genres.map(genre => (
                        <div
                            key={genre.slug}
                            onClick={() => handleGenreClick(genre.slug)}
                            className="glass-panel"
                            style={{
                                padding: '2.5rem 4rem',
                                borderRadius: '24px',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                                flex: '1 1 300px',
                                textAlign: 'center',
                                scale: '1'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'var(--border-glass)';
                            }}
                        >
                            <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', display: 'block' }}>{genre.name}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: '700', marginTop: '0.5rem', display: 'block', opacity: 0.6 }}>EXPLORAR</span>
                        </div>
                    ))}
                </div>

                <p style={{ marginTop: '3rem', color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', lineHeight: '1.6' }}>
                    Haz clic en una categoría para descubrir los mejores títulos seleccionados por nuestro motor inteligente.
                </p>
            </div>
        </div>
    )
}

export default Home;
