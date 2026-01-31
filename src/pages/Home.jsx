import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container" style={{ padding: '2rem' }}>
            <Carousel />

            <div style={{ textAlign: 'center', margin: '6rem 0' }}>
                <h1 className="animate-enter" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.05em' }}>
                    LA BASE DE DATOS DEFINITIVA
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
                    Explora miles de títulos. Descubre tus nuevos favoritos. Potenciado por RAWG.
                </p>
                <Link to="/games">
                    <button style={{ padding: '1rem 3rem', fontSize: '1rem', letterSpacing: '0.1em' }}>EXPLORAR CATÁLOGO</button>
                </Link>
            </div>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', paddingBottom: '4rem' }}>
                <div className="game-card" style={{ padding: '3rem', textAlign: 'left', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Búsqueda Avanzada</h2>
                    <p style={{ margin: 0 }}>Encuentra cualquier juego en segundos con nuestro motor de búsqueda en tiempo real.</p>
                </div>
                <div className="game-card" style={{ padding: '3rem', textAlign: 'left', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Tendencias</h2>
                    <p style={{ margin: 0 }}>Descubre lo que el mundo está jugando ahora mismo con nuestros gráficos en vivo.</p>
                </div>
                <div className="game-card" style={{ padding: '3rem', textAlign: 'left', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Estadísticas Detalladas</h2>
                    <p style={{ margin: 0 }}>Accede a valoraciones, plataformas, fechas de lanzamiento e información del desarrollador.</p>
                </div>
            </section>
        </div>
    )
}

export default Home
