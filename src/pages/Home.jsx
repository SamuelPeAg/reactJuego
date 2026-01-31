import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <Carousel />

            <div style={{ textAlign: 'center', margin: '4rem 0' }}>
                <h1 className="animate-enter">Tu guía definitiva de videojuegos</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    Explora miles de títulos, descubre nuevos favoritos y mantente al día con los lanzamientos más populares. Usando la potencia de RAWG API.
                </p>
                <Link to="/games">
                    <button style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>Explorar Catálogo</button>
                </Link>
            </div>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2>🔍 Buscador Avanzado</h2>
                    <p>Encuentra cualquier juego en segundos con nuestro buscador en tiempo real.</p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2>🔥 Los más populares</h2>
                    <p>Descubre qué está jugando el mundo ahora mismo con nuestros charts actualizados.</p>
                </div>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2>⭐ Detalles Completos</h2>
                    <p>Accede a calificaciones, plataformas, fechas de lanzamiento y más.</p>
                </div>
            </section>
        </div>
    )
}

export default Home
