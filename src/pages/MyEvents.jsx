import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cancelEvent } from '../features/events/eventsSlice';

function MyEvents() {
    const dispatch = useDispatch();
    const { myEvents } = useSelector((state) => state.events);

    return (
        <div className="page-container">
            <div className="animate-in" style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-primary)', marginBottom: '1.5rem' }}>TU AGENDA</h2>
                <h1 className="text-gradient">MIS EVENTOS</h1>
            </div>

            {myEvents.length === 0 ? (
                <div className="glass-panel animate-in" style={{ padding: '8rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '2rem' }}>📅</div>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>Aún no te has apuntado a ningún evento.</p>
                    <Link to="/eventos" className="btn-nova primary">
                        EXPLORAR EVENTOS
                    </Link>
                </div>
            ) : (
                <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {myEvents.map(event => (
                        <div key={event.id} className="glass-panel overflow-hidden relative group" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="h-full w-full obj-cover transition-transform duration-700 group-hover:scale-110"
                                    style={{ objectFit: 'cover' }}
                                    loading="lazy"
                                />
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                            </div>

                            <div className="p-6" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white', fontWeight: '800' }}>
                                        {event.title}
                                    </h3>
                                    <p style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: '600' }}>
                                        📍 {event.location}
                                    </p>
                                </div>

                                <button
                                    onClick={() => dispatch(cancelEvent(event.id))}
                                    className="btn-nova"
                                    style={{ width: '100%', justifyContent: 'center' }}
                                >
                                    CANCELAR PARTICIPACIÓN
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyEvents;
