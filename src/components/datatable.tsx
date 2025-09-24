interface Column {
  header: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column[];
  data: T[];
}

const DataTable = <T extends { id: string }>({
  columns,
  data,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto flex flex-col items-center">
      <table className="table mx-auto">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
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
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="join gap-2 mt-4 flex justify-center">
        <button className="join-item btn btn-xs">1</button>
        <button className="join-item btn btn-xs btn-active">2</button>
        <button className="join-item btn btn-xs">3</button>
        <button className="join-item btn btn-xs">4</button>
      </div>
    </div>
  );
};

export default DataTable;
