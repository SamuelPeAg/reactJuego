import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
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
                    EXPLORAR CATÁLOGO
                </Link>
            </div>

            <div className="bento-nova animate-in" style={{ animationDelay: '0.4s' }}>

                {/* Big Card - Smart Search */}
                <div className="span-full glass-panel relative overflow-hidden group" style={{ minHeight: '600px', display: 'flex', alignItems: 'center' }}>
                    <div
                        className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('https://media.rawg.io/media/games/618/618c203a6406f6b760fb571e7b9019c4.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--bg-dark) 30%, transparent)' }} />
                    <div className="relative p-12 lg:p-24 z-10">
                        <span style={{ color: 'var(--accent-secondary)', fontWeight: '800', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '1.5rem', display: 'block' }}>FUNCIONALIDAD PRINCIPAL</span>
                        <h2 style={{ fontSize: '3.5rem', maxWidth: '600px', lineHeight: '1.1', marginBottom: '2rem' }}>BÚSQUEDA<br />SIN FRONTERAS</h2>
                        <p style={{ fontSize: '1.2rem', maxWidth: '500px', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: '1.8' }}>
                            Nuestro motor conectado a RAWG te permite filtrar entre más de 500,000 títulos. Encuentra joyas ocultas por género, plataforma o calificación en milisegundos.
                        </p>
                        <div className="flex gap-4">
                            <div className="glass-panel" style={{ padding: '1rem 2rem', borderRadius: '12px', border: '1px solid var(--accent-primary)' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>500K+</span>
                                <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>JUEGOS</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '1rem 2rem', borderRadius: '12px', border: '1px solid var(--accent-secondary)' }}>
                                <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>50+</span>
                                <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>PLATAFORMAS</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Card - Explore */}
                <div className="span-large glass-panel overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-10 bg-white" />
                    <div className="p-12 relative">
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>EXPLORA TÍTULOS</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Navega por la base de datos más completa del mundo. Descubre lanzamientos, clásicos y lo más esperado.</p>
                        <Link to="/games" className="btn-nova" style={{ border: '1px solid var(--accent-primary)' }}>
                            IR AL BUSCADOR
                        </Link>
                    </div>
                </div>

                {/* Right Card - Favorites */}
                <div className="span-small glass-panel overflow-hidden relative group" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), transparent)' }}>
                    <div className="p-12 relative flex flex-col justify-between h-full">
                        <div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>TUS FAVORITOS</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Crea tu propia colección personalizada.</p>
                        </div>
                        <Link to="/favorites" className="btn-nova primary">
                            COLECCIÓN
                        </Link>
                    </div>
                </div>

            </div>

            {/* Categorías (Future thought requirement) */}
            <div className="animate-in" style={{ marginTop: '8rem', paddingLeft: '2rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '800', letterSpacing: '0.2em' }}>PRÓXIMAMENTE</span>
                <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '3rem' }}>EXPLORA POR GÉNERO</h2>
                <div className="flex gap-4 flex-wrap">
                    {['Acción', 'Aventura', 'RPG', 'Shooter', 'Puzzle', 'Indie'].map(cat => (
                        <div key={cat} className="glass-panel" style={{ padding: '2rem 3.5rem', borderRadius: '20px', cursor: 'default', opacity: 0.6 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>{cat}</span>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>* Navegación por categorías disponible en la próxima actualización.</p>
            </div>
        </div>
    )
}

export default Home;
