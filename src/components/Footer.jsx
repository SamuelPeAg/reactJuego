import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="glass-panel" style={{ marginTop: '8rem', marginBottom: '2rem', marginInline: '2rem', padding: '4rem', borderRadius: 'var(--radius-xl)' }}>
            <div className="flex justify-between items-start" style={{ flexWrap: 'wrap', gap: '4rem' }}>
                <div style={{ maxWidth: '400px' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        NOVA<span style={{ fontWeight: '200', opacity: 0.6 }}>DB</span>
                    </h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        La plataforma definitiva para explorar el universo de los videojuegos. Datos impulsados por la API de RAWG.
                    </p>
                </div>

                <div className="flex gap-large" style={{ flexWrap: 'wrap' }}>
                    <div className="flex flex-col gap-small">
                        <span style={{ fontWeight: '800', fontSize: '0.7rem', color: 'var(--accent-primary)', letterSpacing: '0.2em' }}>NAVEGACIÓN</span>
                        <Link to="/" className="nav-link">Inicio</Link>
                        <Link to="/games" className="nav-link">Explorar</Link>
                        <Link to="/favorites" className="nav-link">Favoritos</Link>
                    </div>

                    <div className="flex flex-col gap-small">
                        <span style={{ fontWeight: '800', fontSize: '0.7rem', color: 'var(--accent-secondary)', letterSpacing: '0.2em' }}>REDES</span>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
                        <a href="https://rawg.io" target="_blank" rel="noreferrer" className="nav-link">RAWG.io</a>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-glass)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>© {new Date().getFullYear()} NOVADB Enterprise. Todos los derechos reservados.</p>
                <p style={{ color: 'var(--accent-primary)', fontWeight: '600', letterSpacing: '0.1em' }}>DESARROLLADO POR SAMUEL PEÑA</p>
            </div>
        </footer>
    );
}

export default Footer;
