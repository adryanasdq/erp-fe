import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import DataTable from "@/components/datatable";
import type { TableHeaders } from "@/components/datatable";

import type { IStockMovement } from "@/models/types/inventory/stock-movement";
import useStore from "@/models/stores";

interface IStockMovementTableProps {
    data: IStockMovement[];
    openModal?: () => void;
    searchText?: string;
    handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const StockMovementTable: React.FC<IStockMovementTableProps> = ({
    data,
    openModal,
    searchText,
    handleSearch
}) => {
    const [pageSize, setPageSize] = useState(10);
    const movementTypes = useStore((state) => state.lookupItems);
    const warehouses = useStore((state) => state.warehouses);
    const items = useStore((state) => state.items);
    const uoms = useStore((state) => state.uoms);

    const movementTypeMap = useMemo(() => {
        return Object.fromEntries(
            movementTypes.map((type) => [type.value, type.label])
        );
    }, [movementTypes]);

    const itemMap = useMemo(() => {
        return Object.fromEntries(
            items.map((item) => [item.id, item.name])
        );
    }, [items]);

    const uomMap = useMemo(() => {
        return Object.fromEntries(
            uoms.map((uom) => [uom.id, uom.name])
        );
    }, [uoms]);

    const warehouseMap = useMemo(() => {
        return Object.fromEntries(
            warehouses.map((warehouse) => [warehouse.id, warehouse.name])
        );
    }, [warehouses]);

    const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    }

    const headers: TableHeaders<IStockMovement>[] = [
        {
            key: "item_id",
            title: "Item",
            align: "left",
            minWidth: 20,
            render: (row) => itemMap[row.item_id]
        },
        {
            key: "qty",
            title: "Quantity",
            align: "left",
            minWidth: 20
        },
        {
            key: "type",
            title: "Type",
            align: "left",
            minWidth: 20,
            render: (row) => movementTypeMap[row.type] || row.type
        },
        {
            key: "created_date",
            title: "Created Date",
            align: "left",
            minWidth: 20,
            render: (row) => new Date(row.created_date).toLocaleDateString()
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
                isEditable={false}
                isDeletable={false}
            />
        </>
    )
}

export default StockMovementTable;
