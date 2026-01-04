import { StateCreator } from "zustand";

import { stockMovementAPI } from "@/api/clients/inventory/stock-movement";
import { IStockMovement, IStockTransfer } from "@/models/types/inventory/stock-movement";

interface IStockMovementSlice {
    stockMovements: IStockMovement[];
    isStockMovementLoading: boolean;
    fetchStockMovements: () => Promise<void>;
    createStockMovement: (data: IStockMovement, token?: string) => Promise<string>;
    createStockTransfer: (data: IStockTransfer, token?: string) => Promise<string>;
}

const createStockMovementSlice: StateCreator<IStockMovementSlice> = (set) => ({
    stockMovements: [],
    isStockMovementLoading: false,
    fetchStockMovements: async () => {
        try {
            set({ isStockMovementLoading: true });
            const data = await stockMovementAPI.getAll();
            set({ stockMovements: data }, false)
        } catch {
            // do something
        } finally {
            set({ isStockMovementLoading: false });
        }
    },
    createStockMovement: async (data, token) => {
        try {
            set({ isStockMovementLoading: true });
            await stockMovementAPI.postStockMovement(data, token);
        } catch {
            // do something
        } finally {
            set({ isStockMovementLoading: false });
        }

        return "Stock movement created successfully";
    },
    createStockTransfer: async (data, token) => {
        try {
            set({ isStockMovementLoading: true });
            await stockMovementAPI.postStockTransfer(data, token);
        } catch {
            // do something
        } finally {
            set({ isStockMovementLoading: false });
        }
        
        return "Stock transfer created successfully";
    },
});

export default createStockMovementSlice;
export type { IStockMovementSlice }; 