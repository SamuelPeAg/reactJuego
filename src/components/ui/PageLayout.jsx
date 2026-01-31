import React from 'react';

const PageLayout = ({ children, className = '' }) => {
    return (
        <div className={`max-w-[1600px] mx-auto px-6 py-8 md:px-12 animate-fade-in ${className}`}>
            {children}
        </div>
    );
};

export default PageLayout;
