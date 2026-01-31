import Link from 'react-router-dom/Link';
import Carousel from '../components/Carousel';

function Home() {
    return (
        <div className="page-layout">
            <Carousel />

            <div className="container text-center mb-large">
                <Link to="/games" className="btn btn-primary">
                    EXPLORAR CATÁLOGO COMPLETO
                </Link>
            </div>

            <div className="container">
                <div className="bento-grid">

                    {/* Búsqueda (Large) */}
                    <div className="span-8 card-glass" style={{ minHeight: '400px' }}>
                        <div
                            className="absolute inset-0 bg-cover"
                            style={{
                                backgroundImage: "url('https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg')",
                                opacity: 0.4
                            }}
                        />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }} />
                        <div className="card-content h-full flex flex-col justify-end">
                            <h2>BÚSQUEDA AVANZADA</h2>
                            <p>Encuentra tus juegos favoritos instantáneamente con nuestro motor optimizado.</p>
                        </div>
                    </div>

                    {/* Tendencias (Small) */}
                    <div className="span-4 card-glass" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <div className="card-content">
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔥</div>
                            <h3>Tendencias</h3>
                            <p style={{ margin: 0 }}>Lo más jugado del momento.</p>
                        </div>
                    </div>

                    {/* Datos (Small) */}
                    <div className="span-4 card-glass">
                        <div className="card-content h-full flex flex-col justify-between">
                            <div>
                                <h3>Datos en Tiempo Real</h3>
                                <div style={{ height: '4px', width: '50px', background: 'white', marginTop: '1rem' }} />
                            </div>
                            <p style={{ fontSize: '0.9rem' }}>Powered by RAWG API. Metadatos precisos y actualizados al segundo.</p>
                        </div>
                    </div>

                    {/* Favoritos (Medium) */}
                    <div className="span-8 card-glass">
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(45deg, rgba(30,58,138,0.3), rgba(88,28,135,0.3))'
                            }}
                        />
                        <div className="card-content h-full flex items-center justify-between">
                            <div>
                                <h3>Tu Colección</h3>
                                <p style={{ margin: 0 }}>Guarda y organiza tus descubrimientos.</p>
                            </div>
                            <Link to="/favorites" className="btn btn-secondary">
                                IR A FAVORITOS
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;
