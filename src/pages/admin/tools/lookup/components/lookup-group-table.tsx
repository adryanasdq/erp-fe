import { useState } from "react";

import DataTable, { TableHeaders } from "@/components/datatable";
import type { ILookupGroup } from "@/models/types/admin/tools/lookup";


interface LookupItemTableProps {
    data: ILookupGroup[];
    searchText?: string;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGroupClick?: (groupCode: string) => void;
}

const LookupItemTable: React.FC<LookupItemTableProps> = ({
    data,
    searchText,
    handleSearch,
    handleGroupClick
}) => {
    const [pageSize, setPageSize] = useState(10);

    const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    }

    const headers: TableHeaders<ILookupGroup>[] = [
        {
            key: "group_code",
            title: "Group Code",
            align: "left",
            minWidth: 20,
            render: (item) => (
                <div
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() => handleGroupClick(item.group_code)}
                >
                    {item.group_code}
                </div>
            )
        },
        {
            key: "group_desc",
            title: "Description",
            align: "left",
            minWidth: 20
        }
    ];

    return (
        <div>
            <div className="flex justify-between mb-4">
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
            />
        </div>
    );
}

export default LookupItemTable;