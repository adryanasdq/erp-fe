import { StateCreator } from "zustand";

import { warehouseAPI } from "@/api/clients/inventory/warehouse";
import { IWarehouse } from "@/models/types/inventory/warehouse";

interface IWarehouseSlice {
    warehouses: IWarehouse[];
    isWarehouseLoading: boolean;
    fetchWarehouses: () => Promise<void>;
    createWarehouse: (data: IWarehouse, token?: string) => Promise<string>;
    updateWarehouse: (data: IWarehouse, token?: string) => Promise<string>;
    deleteWarehouse: (warehouseId: string, token?: string) => Promise<string>;
}

const createWarehouseSlice: StateCreator<IWarehouseSlice> = (set) => ({
    warehouses: [],
    isWarehouseLoading: false,
    fetchWarehouses: async () => {
        try {
            set({ isWarehouseLoading: true });
            const data = await warehouseAPI.getAll();
            set({ warehouses: data }, false)
        } catch {
            // do something
        } finally {
            set({ isWarehouseLoading: false });
        }
    },
    createWarehouse: async (data, token) => {
        try {
            set({ isWarehouseLoading: true });
            await warehouseAPI.postWarehouse(data, token);
        } catch {
            // do something
        } finally {
            set({ isWarehouseLoading: false });
        }
        
        return "Warehouse created successfully";
    },
    updateWarehouse: async (data, token) => {
        try {
            set({ isWarehouseLoading: true });
            await warehouseAPI.updateWarehouse(data, token);
        } catch {
            // do something
        } finally {
            set({ isWarehouseLoading: false });
        }

        return "Warehouse updated successfully";
    },
    deleteWarehouse: async (empId, token) => {
        try {
            set({ isWarehouseLoading: true });
            await warehouseAPI.deleteWarehouse(empId, token);
        } catch {
            // do something
        } finally {
            set({ isWarehouseLoading: false });
        }

        return "Warehouse deleted successfully";
    }
});

export default createWarehouseSlice;
export type { IWarehouseSlice }; 