import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/10 transition-all duration-300">
            <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-white/80 transition-colors flex items-center gap-2">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                GAME<span className="font-light text-gray-400">EXPLORER</span>
            </Link>

            <div className="flex gap-8 items-center">
                {[
                    { path: '/', label: 'Inicio' },
                    { path: '/games', label: 'Explorar' },
                    { path: '/favorites', label: 'Favoritos' }
                ].map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`
                    text-sm font-semibold tracking-widest uppercase transition-all duration-300 relative group
                    ${isActive(link.path) ? 'text-white' : 'text-gray-500 hover:text-white'}
                `}
                    >
                        {link.label}
                        <span className={`absolute -bottom-2 left-0 w-full h-[1px] bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${isActive(link.path) ? 'scale-x-100' : ''}`} />
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
