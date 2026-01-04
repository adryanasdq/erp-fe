import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores"

import StockMovementTable from "./components/stock-movement-table";
import StockMovementFormModal from "./components/stock-movement-form-modal";


const StockMovementPage = () => {
    const stockMovements = useStore((state) => state.stockMovements);
    const [searchText, setSearchText] = useState("");

    const fetchStockMovements = useStore((state) => state.fetchStockMovements);
    const fetchMovementTypeOptions = useStore((state) => state.fetchLookupItemsByGroupCode);
    const fetchWarehouses = useStore((state) => state.fetchWarehouses);
    const fetchItems = useStore((state) => state.fetchItems);
    const fetchUOMs = useStore((state) => state.fetchUOMs);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchStockMovements(),
                    fetchItems(),
                    fetchMovementTypeOptions("STOCK_MVMNT"),
                    fetchUOMs(),
                    fetchWarehouses(),
                ]);
            } catch (error) {
                console.error("Failed to fetch initial data", error);
            }
        };

        fetchData();
    }, [fetchItems, fetchMovementTypeOptions, fetchUOMs, fetchWarehouses]);

    const filteredStockMovements = useMemo(() => {
        if (stockMovements.length == 0) return [];

        return stockMovements.filter((movement) => {
            return movement.item_id.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [stockMovements, searchText])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const openModal = () => {
        (document.getElementById("stock-movement-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <StockMovementFormModal />

            <div className="text-4xl mt-4 mb-8">Stock Movement</div>

            <StockMovementTable
                data={filteredStockMovements}
                openModal={openModal}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default StockMovementPage;
