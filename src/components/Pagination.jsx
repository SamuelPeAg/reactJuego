import { useSearchParams } from 'react-router-dom';

function Pagination({ totalPages }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', page);
        setSearchParams(newSearchParams);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end === totalPages) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`btn-nova ${currentPage === i ? 'primary' : ''}`}
                    style={{
                        minWidth: '50px',
                        padding: '0.5rem',
                        justifyContent: 'center',
                        fontSize: '0.9rem'
                    }}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-medium mt-large animate-in" style={{ paddingBottom: '2rem' }}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-nova"
                style={{ opacity: currentPage === 1 ? 0.3 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
                &larr;
            </button>

            <div className="flex gap-small">
                {renderPageNumbers()}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn-nova"
                style={{ opacity: currentPage === totalPages ? 0.3 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
                &rarr;
            </button>
        </div>
    );
}

export default Pagination;
