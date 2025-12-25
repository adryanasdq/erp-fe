import { StateCreator } from "zustand";

import { stockBalanceAPI } from "@/api/clients/inventory/stock-balance";
import { IStockBalance } from "@/models/types/inventory/stock-balance";

interface IStockBalanceSlice {
    stockBalances: IStockBalance[];
    isStockBalanceLoading: boolean;
    fetchStockBalances: () => Promise<void>;
}

const createStockBalanceSlice: StateCreator<IStockBalanceSlice> = (set) => ({
    stockBalances: [],
    isStockBalanceLoading: false,
    fetchStockBalances: async () => {
        try {
            set({ isStockBalanceLoading: true });
            const data = await stockBalanceAPI.getAll();
            set({ stockBalances: data }, false)
        } catch {
            // do something
        } finally {
            set({ isStockBalanceLoading: false });
        }
    },
});

export default createStockBalanceSlice;
export type { IStockBalanceSlice }; 