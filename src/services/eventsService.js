const STATIC_EVENTS = [
    {
        id: 1,
        title: "E3 2026 - El Resurgir",
        location: "Los Angeles, CA",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Tokyo Game Show",
        location: "Tokio, Japón",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Gamescom: Opening Night",
        location: "Colonia, Alemania",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
    }
];

export const fetchEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(STATIC_EVENTS);
        }, 500);
    });
};
