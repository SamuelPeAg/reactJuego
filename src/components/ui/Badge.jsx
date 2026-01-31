import React from 'react';

const Badge = ({ children, variant = 'default' }) => {
    const styles = {
        default: "bg-white/5 border border-white/10 text-gray-300",
        success: "bg-green-500/10 border border-green-500/30 text-green-400",
        rating: "bg-white text-black font-bold",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${styles[variant]} backdrop-blur-sm`}>
            {children}
        </span>
    );
};

export default Badge;
