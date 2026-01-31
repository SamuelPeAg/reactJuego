import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();

    const getLinkClass = (path) => {
        const active = location.pathname === path ? 'active' : '';
        return `nav-link ${active}`;
    };

    return (
        <nav className="nav-fixed">
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.05em' }}>
                GAME<span style={{ fontWeight: '300', color: 'var(--text-tertiary)' }}>EXPLORER</span>
            </Link>

            <div className="flex items-center">
                <Link to="/" className={getLinkClass('/')}>
                    Inicio
                </Link>
                <Link to="/games" className={getLinkClass('/games')}>
                    Explorar
                </Link>
                <Link to="/favorites" className={getLinkClass('/favorites')}>
                    Favoritos
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
