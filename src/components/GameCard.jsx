import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Badge from './ui/Badge';

function GameCard({ game }) {
    if (!game) return null;

    return (
        <Link to={`/game/${game.id}`}>
            <Card className="p-0 h-full group relative overflow-hidden border border-white/5 hover:border-white/20">
                <div className="absolute top-3 right-3 z-10">
                    <Badge variant="rating" className="shadow-lg">{game.rating.toFixed(1)}</Badge>
                </div>

                <div className="h-[280px] w-full overflow-hidden relative">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter-none filter grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                <div className="p-5 relative">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold leading-tight group-hover:text-white transition-colors line-clamp-2">
                            {game.name}
                        </h3>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                        <span>{game.released?.split('-')[0] || 'TBA'}</span>
                        <div className="flex gap-2">
                            {game.parent_platforms?.slice(0, 3).map(p => (
                                <span key={p.platform.id} className="text-xs uppercase tracking-wider opacity-70">
                                    {p.platform.name.slice(0, 3)}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default GameCard;
