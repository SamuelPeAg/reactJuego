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
                <div className="span-full glass-panel relative overflow-hidden group" style={{ minHeight: '600px' }}>
                    <div
                        className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
                        style={{
                            backgroundImage: "url('https://media.rawg.io/media/games/618/618c203a6406f6b760fb571e7b9019c4.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.4
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-dark) 5%, transparent)' }} />
                    <div className="relative h-full flex flex-col justify-end p-12">
                        <span style={{ color: 'var(--accent-secondary)', fontWeight: '800', letterSpacing: '0.3em', fontSize: '0.8rem', marginBottom: '1.5rem' }}>TECNOLOGÍA</span>
                        <h2 style={{ fontSize: '3.5rem', maxWidth: '700px', lineHeight: '1' }}>FILTRADO<br />INTELIGENTE</h2>
                        <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', maxWidth: '500px', color: 'var(--text-muted)' }}>
                            Encuentra exactamente lo que buscas con nuestro motor de búsqueda avanzado. Millones de datos a tu disposición.
                        </p>
                    </div>
                </div>


                {/* Wide Link - Favorites */}
                <div className="span-full glass-panel overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }} />
                    <div className="relative p-12 flex items-center justify-between">
                        <div>
                            <span style={{ color: 'var(--accent-primary)', fontWeight: '800', letterSpacing: '0.2em', fontSize: '0.8rem', display: 'block', marginBottom: '1rem' }}>BIBLIOTECA</span>
                            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>TUS FAVORITOS</h2>
                            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '1.1rem' }}>Donde tus juegos más amados descansan.</p>
                        </div>
                        <Link to="/favorites" className="btn-nova" style={{ background: 'white', color: 'black', border: 'none' }}>
                            VER MI LISTA
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;

