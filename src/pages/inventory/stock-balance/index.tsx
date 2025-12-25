import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores"

import StockBalanceTable from "./components/stock-balance-table";


const StockBalancePage = () => {
    const stockBalances = useStore((state) => state.stockBalances);
    const fetchStockBalances = useStore((state) => state.fetchStockBalances);
    const fetchItems = useStore((state) => state.fetchItems);
    const fetchWarehouses = useStore((state) => state.fetchWarehouses);

    const [searchText, setSearchText] = useState("");

    const filteredStockBalance = useMemo(() => {
        return stockBalances.filter((sb) => {
            return sb.item_id.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [stockBalances, searchText])

    useEffect(() => {
        fetchStockBalances();
    }, [fetchStockBalances])

    useEffect(() => {
        fetchItems();
    }, [fetchItems])

    useEffect(() => {
        fetchWarehouses();
    }, [fetchWarehouses])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    return (
        <>
            <div className="text-4xl mt-4 mb-8">Stock Balance</div>

            <StockBalanceTable
                data={filteredStockBalance}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default StockBalancePage;