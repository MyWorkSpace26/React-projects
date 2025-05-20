export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="mt-8 flex justify-center">
      {totalPages > 1 && (
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="rounded-md border border-gray-300 px-3 py-1 disabled:opacity-50 cursor-pointer"
          >
            Назад
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => onPageChange(i + 1)}
              className={`rounded-md px-3 py-1 cursor-pointer ${
                currentPage === i + 1
                  ? "bg-purple-700 text-white"
                  : "border border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="rounded-md border border-gray-300 px-3 py-1 disabled:opacity-50 cursor-pointer"
          >
            Вперед
          </button>
        </div>
      )}
    </div>
  );
}
