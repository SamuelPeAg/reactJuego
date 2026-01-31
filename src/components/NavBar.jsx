import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="nav-bar" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <Link to="/" style={{ fontSize: '1.2rem', fontWeight: '600', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                GameExplorer
            </Link>
            <div style={{ display: 'flex', gap: '3rem' }}>
                <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Home</Link>
                <Link to="/games" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</Link>
                <Link to="/favorites" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;
