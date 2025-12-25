import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

type TextAlign = "left" | "right" | "center" | "justify" | "start" | "end";

interface TableHeaders<T> {
  key: keyof T;
  align: TextAlign;
  minWidth: number;
  title: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id?: string }> {
  headers: TableHeaders<T>[];
  data: T[];
  pageSize: number;
  isEditable?: boolean;
  isDeletable?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const DataTable = <T extends { id?: string }>({
  headers,
  data,
  pageSize,
  isEditable = false,
  isDeletable = false,
  onEdit,
  onDelete
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
    <div className="card bg-base-100 shadow-md p-4 border border-base-300 overflow-auto">
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
            {(isEditable || isDeletable) && <th style={{ textAlign: 'center' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            <>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-base-300"
                >
                  {headers.map((h) => (
                    <td key={String(h.key)} style={{ textAlign: h.align }}>
                      {h.render ? h.render(row) : String(row[h.key])}
                    </td>
                  ))}
                  {(isEditable || isDeletable) && (
                    <td>
                      <div className="flex gap-2 items-center justify-center">
                        {isEditable && (
                          <button
                            onClick={() => onEdit && onEdit(row.id)}
                          >
                            <Pencil size={14} />
                          </button>
                        )}
                        {isDeletable && (
                          <button
                            onClick={() => onDelete && onDelete(row.id)}
                            className="!bg-red-500 text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              <tr>
                <td colSpan={headers.length + (isEditable || isDeletable ? 1 : 0)} className="text-right font-semibold">
                  Total Records: {data.length}
                </td>
              </tr>
            </>
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
