import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="page-container">
            <Carousel />

            <div className="text-center mb-large animate-in" style={{ animationDelay: '0.2s' }}>
                <h2 style={{ fontSize: '1rem', color: 'var(--accent-primary)', letterSpacing: '0.4em', marginBottom: '1.5rem' }}>EXPLORA LA PRÓXIMA GENERACIÓN</h2>
                <h1 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '3.5rem' }}>BIENVENIDO A LA<br />MAYOR BIBLIOTECA</h1>
                <Link to="/games" className="btn-nova primary" style={{ scale: '1.2' }}>
                    DESCUBRE AHORA
                </Link>
            </div>

            <div className="bento-nova animate-in" style={{ animationDelay: '0.4s' }}>

                {/* Big Card */}
                <div className="span-large glass-panel relative overflow-hidden group" style={{ minHeight: '500px' }}>
                    <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: "url('https://media.rawg.io/media/games/618/618c203a6406f6b760fb571e7b9019c4.jpg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.3
                        }}
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-dark), transparent)' }} />
                    <div className="relative h-full flex flex-col justify-end p-10">
                        <span style={{ color: 'var(--accent-secondary)', fontWeight: '700', letterSpacing: '0.2em', fontSize: '0.75rem', marginBottom: '1rem' }}>SISTEMA ÚNICO</span>
                        <h2 style={{ fontSize: '3rem', maxWidth: '600px' }}>BUSCA CON INTELIGENCIA</h2>
                        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Accede a miles de títulos clasificados por los mejores jugadores y críticos del mundo.</p>
                    </div>
                </div>

                {/* Stat Card */}
                <div className="span-small glass-panel flex flex-col justify-center items-center text-center p-10">
                    <h3 style={{ fontSize: '4rem', marginBottom: '0' }} className="text-gradient">500k+</h3>
                    <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '500' }}>Títulos registrados</p>
                    <div style={{ height: '1px', width: '40px', background: 'var(--accent-primary)', margin: '2rem 0' }} />
                    <p style={{ margin: 0, fontSize: '0.875rem' }}>La mayor base de datos abierta de videojuegos en tiempo real.</p>
                </div>

                {/* Small Highlight */}
                <div className="span-small glass-panel p-8 flex flex-col justify-between">
                    <div style={{ fontSize: '2.5rem' }}>💎</div>
                    <div>
                        <h3 style={{ marginBottom: '0.5rem' }}>Colección PRO</h3>
                        <p style={{ fontSize: '0.875rem', margin: 0 }}>Crea listas, guarda favoritos y sigue tus próximos lanzamientos.</p>
                    </div>
                </div>

                {/* Wide Link */}
                <div className="span-large glass-panel overflow-hidden relative group">
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))' }} />
                    <div className="relative p-10 flex items-center justify-between">
                        <div>
                            <h2 style={{ fontSize: '2.5rem' }}>TUS FAVORITOS</h2>
                            <p style={{ margin: 0 }}>Gestiona tu biblioteca personal de forma elegante.</p>
                        </div>
                        <Link to="/favorites" className="btn-nova">
                            IR A MI BIBLIOTECA
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home;
