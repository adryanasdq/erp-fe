interface DataTableProps<T extends { id: string }> {
  headers: string[];
  data: T[];
}

const DataTable = <T extends { id: string }>({
  headers,
  data,
}: DataTableProps<T>) => {
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
              <td colSpan={headers.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="join gap-2 mt-4 flex justify-center">
        <button className="join-item btn btn-xs">«</button>
        <button className="join-item btn btn-xs">1</button>
        <button className="join-item btn btn-xs btn-active">2</button>
        <button className="join-item btn btn-xs">3</button>
        <button className="join-item btn btn-xs">...</button>
        <button className="join-item btn btn-xs">10</button>
        <button className="join-item btn btn-xs">»</button>
      </div>
    </div>
  );
};

export default DataTable;
