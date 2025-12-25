import { useState } from "react";
import { Plus } from "lucide-react";

import DataTable, { TableHeaders } from "@/components/datatable";
import type { IMenuItem } from "@/models/types/admin/tools/menu";

interface MenuTableProps {
    data: IMenuItem[];
    openModal?: () => void;
    onEdit?: (menuId: string) => void;
    onDelete?: (menuId: string) => void;
    searchText?: string;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MenuTable: React.FC<MenuTableProps> = ({
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

    const headers: TableHeaders<IMenuItem>[] = [
        {
            key: "title",
            title: "Title",
            align: "left",
            minWidth: 20
        },
        {
            key: "url",
            title: "URL",
            align: "left",
            minWidth: 20
        },
        {
            key: "order_index",
            title: "Order Index",
            align: "left",
            minWidth: 20
        },
        {
            key: "is_hidden",
            title: "Hidden",
            align: "left",
            minWidth: 20,
            render: (item) => (item.is_hidden ? "Yes" : "No")
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
    );
}

export default MenuTable;