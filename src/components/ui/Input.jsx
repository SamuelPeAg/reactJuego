import React from 'react';

const Input = ({ value, onChange, placeholder, className = '', ...props }) => {
    return (
        <div className={`relative group ${className}`}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-all duration-300"
                {...props}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full group-focus-within:w-full" />
        </div>
    );
};

export default Input;
