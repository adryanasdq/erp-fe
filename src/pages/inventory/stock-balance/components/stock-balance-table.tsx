import { useMemo, useState } from "react";

import DataTable from "@/components/datatable";
import type { TableHeaders } from "@/components/datatable";

import type { IStockBalance } from "@/models/types/inventory/stock-balance";
import useStore from "@/models/stores";

interface StockBalanceTableProps {
    data: IStockBalance[];
    searchText?: string;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StockBalanceTable: React.FC<StockBalanceTableProps> = ({
    data,
    searchText,
    handleSearch
}) => {
    const [pageSize, setPageSize] = useState(10);
    const items = useStore((state) => state.items);
    const warehouses = useStore((state) => state.warehouses);

    const itemMap = useMemo(() => {
        return Object.fromEntries(
            items.map((cat) => [cat.id, cat.name])
        );
    }, [items]);

    const warehouseMap = useMemo(() => {
        return Object.fromEntries(
            warehouses.map((uom) => [uom.id, uom.name])
        )
    }, [warehouses]);

    const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    }

    const headers: TableHeaders<IStockBalance>[] = [
        {
            key: "item_id",
            title: "Item",
            align: "left",
            minWidth: 20,
            render: (row) => itemMap[row.item_id]
        },
        {
            key: "warehouse_id",
            title: "Warehouse",
            align: "left",
            minWidth: 20,
            render: (row) => warehouseMap[row.warehouse_id]
        },
        {
            key: "qty",
            title: "Qty.",
            align: "left",
            minWidth: 20,
        },
        {
            key: "qty_reserved",
            title: "Qty. Reserved",
            align: "left",
            minWidth: 20,
        },
        {
            key: "qty",
            title: "Qty. Available",
            align: "left",
            minWidth: 20,
            render: (row) => row.qty - row.qty_reserved
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
        </>
    )
}

export default StockBalanceTable;