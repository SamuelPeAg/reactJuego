import React from 'react';

const Card = ({ children, className = '', hoverEffect = true }) => {
    return (
        <div
            className={`
        bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6
        ${hoverEffect ? 'transition-all duration-500 hover:border-white/30 hover:bg-white/5 hover:translate-y-[-5px] hover:shadow-2xl' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
};

export default Card;
