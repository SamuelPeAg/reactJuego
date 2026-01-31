import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

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
                <Link to="/favorites" className={`nav-link ${isActive('/favorites') ? 'active' : ''}`}>
                    Favoritos
                </Link>
            </nav>
        </header>
    );
}

export default Header;
