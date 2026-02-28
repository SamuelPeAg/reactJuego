import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk } from '../features/events/eventsThunks';
import { joinEvent, cancelEvent } from '../features/events/eventsSlice';

function Events() {
    const dispatch = useDispatch();
    const { events, myEvents, loading, error } = useSelector((state) => state.events);

    useEffect(() => {
        dispatch(fetchEventsThunk());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const handleToggleEvent = (event) => {
        const isJoined = myEvents.some((e) => e.id === event.id);
        if (isJoined) {
            dispatch(cancelEvent(event.id));
        } else {
            dispatch(joinEvent(event));
        }
    };

    return (
        <div className="page-container">
            <div className="animate-in" style={{ marginBottom: '6rem', paddingLeft: '2rem' }}>
                <h2 style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
                    EXPERIENCIAS EN VIVO
                </h2>
                <h1 className="text-gradient" style={{ marginBottom: '3rem' }}>EVENTOS GLOBALES</h1>
            </div>

            {loading ? (
                <div className="text-center" style={{ padding: '10rem' }}>
                    <h2 style={{ opacity: 0.5 }}>Cargando eventos...</h2>
                </div>
            ) : error ? (
                <div className="text-center" style={{ padding: '10rem' }}>
                    <h2 style={{ color: 'red' }}>Error: {error}</h2>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {events.map((event) => {
                        const isJoined = myEvents.some((e) => e.id === event.id);

                        return (
                            <div key={event.id} className="glass-panel overflow-hidden relative group animate-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                                        onClick={() => handleToggleEvent(event)}
                                        className={`btn-nova ${isJoined ? '' : 'primary'}`}
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        {isJoined ? 'CANCELAR PARTICIPACIÓN' : 'APUNTARSE'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Events;
