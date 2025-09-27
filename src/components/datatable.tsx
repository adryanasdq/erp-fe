import { useMemo, useState } from "react";

interface DataTableProps<T extends { id: string }> {
  headers: string[];
  data: T[];
}

const DataTable = <T extends { id: string }>({
  headers,
  data,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [currentPage, data]);

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="overflow-x-auto flex flex-col items-center bg-white p-4 rounded-lg shadow-md">
      <table className="table mx-auto">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-base-300"
              >
                {Object.values(row).map((value, index) => (
                  <td key={index}>{String(value)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="join gap-2 mt-4 flex justify-center">
        {Array.from({ length: totalPages > 4 ? 4 : totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`join-item btn btn-xs ${currentPage === page ? "btn-active" : ""
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
