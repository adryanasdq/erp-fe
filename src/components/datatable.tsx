import { useMemo, useState } from "react";

type TextAlign = "left" | "right" | "center" | "justify" | "start" | "end";

interface TableHeaders {
  align: TextAlign;
  minWidth: number;
  title: string;
}

interface DataTableProps<T extends { id?: string }> {
  headers: TableHeaders[];
  data: T[];
  pageSize: number;
}

const DataTable = <T extends { id?: string }>({
  headers,
  data,
  pageSize
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxButtons = 4;

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, data]);

  const totalPages = Math.ceil(data.length / pageSize);

  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  return (
    <div className="overflow-x-auto flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
      <table className="table mx-auto">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{ minWidth: `${header.minWidth}px`, textAlign: header.align }}
              >
                {header.title}
              </th>
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
        <button
          className="join-item btn btn-xs"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          «
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
          page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`join-item btn btn-xs ${currentPage === page ? "btn-active" : ""
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          className="join-item btn btn-xs"
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(prev => Math.min(prev + 1, totalPages))
          }
        >
          »
        </button>
      </div>
    </div>
  );
};

export default DataTable;
export type { TableHeaders };
