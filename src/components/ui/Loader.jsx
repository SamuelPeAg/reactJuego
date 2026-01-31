import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-gray-400 text-sm tracking-[0.2em] animate-pulse">CARGANDO</span>
        </div>
    );
};

export default Loader;
