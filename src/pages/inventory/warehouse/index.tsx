import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores"
import { IWarehouse } from "@/models/types/inventory/warehouse";

import WarehouseTable from "./components/warehouse-table";
import WarehouseFormModal from "./components/warehouse-form-modal";


const WarehousePage = () => {
    const warehouses = useStore((state) => state.warehouses);
    const fetchWarehouses = useStore((state) => state.fetchWarehouses);
    const deleteWarehouse = useStore((state) => state.deleteWarehouse);   

    const [selectedWarehouse, setSelectedWarehouse] = useState<IWarehouse | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredWarehouse = useMemo(() => {
        return warehouses.filter((pos) => {
            return pos.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [warehouses, searchText])

    useEffect(() => {
        fetchWarehouses();
    }, [fetchWarehouses])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (warehouseId: string) => {
        const warehouse = warehouses.find((e) => e.id === warehouseId) || null;

        setSelectedWarehouse(warehouse);
        setFormDialogMode("edit");
        (document.getElementById("warehouse-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (warehouseId: string) => {
        if (confirm("Are you sure want to delete this warehouse?")) {
            deleteWarehouse(warehouseId);
        }

        await fetchWarehouses();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("warehouse-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <WarehouseFormModal
                mode={formDialogMode}
                selectedWarehouse={selectedWarehouse}
            />

            <div className="text-4xl mt-4 mb-8">Warehouse</div>

            <WarehouseTable
                data={filteredWarehouse}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default WarehousePage;