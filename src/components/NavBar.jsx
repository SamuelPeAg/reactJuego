import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            background: 'rgba(15, 15, 19, 0.8)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none' }}>
                GameExplorer
            </Link>
            <div style={{ display: 'flex', gap: '2rem' }}>
                <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Inicio</Link>
                <Link to="/games" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}>Explorar</Link>
            </div>
        </nav>
    );
}

export default NavBar;
