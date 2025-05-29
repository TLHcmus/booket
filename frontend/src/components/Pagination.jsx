import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    pages.push(1);

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(currentPage + 2, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    pages.push(totalPages);

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();
  // Show ellipsis
  const showStartEllipsis = pageNumbers[1] > 2;
  const showEndEllipsis = pageNumbers[pageNumbers.length - 2] < totalPages - 1;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        className={`px-3 py-1 rounded cursor-pointer bg-gray-200 ${
          currentPage === 1 ? 'invisible pointer-events-none' : ''
        }`}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {/* Show first page */}
      {pageNumbers[0] && (
        <button
          onClick={() => handlePageClick(1)}
          className={`px-3 py-1 rounded cursor-pointer ${
            1 === currentPage
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-200'
          }`}
        >
          1
        </button>
      )}
      {/* Show ellipsis */}
      {showStartEllipsis && <span className="px-2 select-none">...</span>}
      {pageNumbers.slice(1, -1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-3 py-1 rounded cursor-pointer ${
            page === currentPage
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}
      {/* Show ellipsis */}
      {showEndEllipsis && <span className="px-2 select-none">...</span>}
      {/* Show last page */}
      {pageNumbers[pageNumbers.length - 1] !== 1 && (
        <button
          onClick={() => handlePageClick(totalPages)}
          className={`px-3 py-1 rounded cursor-pointer ${
            totalPages === currentPage
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-200'
          }`}
        >
          {totalPages}
        </button>
      )}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        className={`px-3 py-1 rounded cursor-pointer bg-gray-200 ${
          currentPage === totalPages ? 'invisible pointer-events-none' : ''
        }`}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Pagination;
