import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
    const baseStyle = "px-6 py-3 rounded-lg font-semibold tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

    const variants = {
        primary: "bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] border border-transparent",
        secondary: "bg-transparent text-white border border-white/20 hover:border-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] backdrop-blur-md",
        danger: "bg-red-600/10 text-red-500 border border-red-500/50 hover:bg-red-600/20 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
