import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <header className="nav-nova">
            <Link to="/" style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white', letterSpacing: '-0.05em', marginRight: '1rem', textDecoration: 'none' }}>
                NOVA<span style={{ fontWeight: '200', opacity: 0.6 }}>DB</span>
            </Link>

            <nav className="flex items-center gap-8">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                    Inicio
                </Link>
                <Link to="/games" className={`nav-link ${isActive('/games') ? 'active' : ''}`}>
                    Explorar
                </Link>
                <Link to="/publishers" className={`nav-link ${isActive('/publishers') ? 'active' : ''}`}>
                    Publishers
                </Link>
                <Link to="/eventos" className={`nav-link ${isActive('/eventos') ? 'active' : ''}`}>
                    Eventos
                </Link>

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        👤
                    </button>
                    {userMenuOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: '0.5rem',
                            background: 'rgba(20, 20, 25, 0.95)',
                            border: '1px solid var(--border-glass)',
                            borderRadius: '8px',
                            padding: '0.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            minWidth: '150px',
                            zIndex: 100
                        }}>
                            <Link to="/favoritos" onClick={() => setUserMenuOpen(false)} className={`nav-link ${isActive('/favoritos') ? 'active' : ''}`} style={{ fontSize: '0.9rem' }}>
                                Mis Favoritos
                            </Link>
                            <Link to="/mis-eventos" onClick={() => setUserMenuOpen(false)} className={`nav-link ${isActive('/mis-eventos') ? 'active' : ''}`} style={{ fontSize: '0.9rem' }}>
                                Mis Eventos
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
