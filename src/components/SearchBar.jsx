function SearchBar({ value, onChange, loading }) {
    return (
        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            <input
                type="text"
                placeholder="Busca cualquier juego..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-nova"
            />
            {loading && (
                <div style={{ position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.1)',
                        borderTopColor: 'var(--accent-primary)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                </div>
            )}
            <style>{`
                @keyframes spin { to { transform: translateY(-50%) rotate(360deg); } }
            `}</style>
        </div>
    );
}

export default SearchBar;
