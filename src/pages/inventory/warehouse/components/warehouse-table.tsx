import { useState } from "react";
import { Plus } from "lucide-react";

import DataTable from "@/components/datatable";
import type { TableHeaders } from "@/components/datatable";

import type { IWarehouse } from "@/models/types/inventory/warehouse";

interface WarehouseTableProps {
    data: IWarehouse[];
    openModal?: () => void;
    onEdit?: (warehouseId: string) => void;
    onDelete?: (warehouseId: string) => void;
    searchText?: string;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WarehouseTable: React.FC<WarehouseTableProps> = ({
    data,
    openModal,
    onEdit,
    onDelete,
    searchText,
    handleSearch
}) => {
    const [pageSize, setPageSize] = useState(10);

    const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    }

    const headers: TableHeaders<IWarehouse>[] = [
        {
            key: "name",
            title: "Name",
            align: "left",
            minWidth: 20
        },
        {
            key: "location",
            title: "Location",
            align: "left",
            minWidth: 20
        },
        {
            key: "modified_date",
            title: "Modified Date",
            align: "left",
            minWidth: 20,
            render: (row) => new Date(row.modified_date).toLocaleDateString()
        }
    ];

    return (
        <>
            <div className="flex justify-between mb-4">
                <button className="btn mr-2 !bg-blue-500 text-white" onClick={openModal}>
                    <Plus /> New
                </button>
                <label className="input mb-2">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </label>

                <div className="flex items-center mx-4">
                    <div>Show</div>
                    <select value={pageSize} className="select mx-2" onChange={handlePageSize}>
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>100</option>
                    </select>
                    <div>entries</div>
                </div>
            </div>

            <DataTable
                headers={headers}
                data={data}
                pageSize={pageSize}
                isEditable={true}
                isDeletable={true}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </>
    )
}

export default WarehouseTable;