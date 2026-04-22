import { StateCreator } from "zustand";

import { supplierAPI } from "@/api/clients/purchasing/warehouse";
import { ISupplier } from "@/models/types/purchasing/supplier";


interface ISupplierSlice {
    suppliers: ISupplier[];
    isSupplierLoading: boolean;
    fetchSuppliers: () => Promise<void>;
    createSupplier: (data: ISupplier, token?: string) => Promise<string>;
    updateSupplier: (data: ISupplier, token?: string) => Promise<string>;
    deleteSupplier: (supplierId: string, token?: string) => Promise<string>;
}

const createSupplierSlice: StateCreator<ISupplierSlice> = (set) => ({
    suppliers: [],
    isSupplierLoading: false,
    fetchSuppliers: async () => {
        try {
            set({ isSupplierLoading: true });
            const data = await supplierAPI.getAll();
            set({ suppliers: data }, false)
        } catch {
            // do something
        } finally {
            set({ isSupplierLoading: false });
        }
    },
    createSupplier: async (data, token) => {
        try {
            set({ isSupplierLoading: true });
            await supplierAPI.postSupplier(data, token);
        } catch {
            // do something
        } finally {
            set({ isSupplierLoading: false });
        }

        return "Supplier created successfully";
    },
    updateSupplier: async (data, token) => {
        try {
            set({ isSupplierLoading: true });
            await supplierAPI.updateSupplier(data, token);
        } catch {
            // do something
        } finally {
            set({ isSupplierLoading: false });
        }

        return "Supplier updated successfully";
    },
    deleteSupplier: async (supplierId, token) => {
        try {
            set({ isSupplierLoading: true });
            await supplierAPI.deleteSupplier(supplierId, token);
        } catch {
            // do something
        } finally {
            set({ isSupplierLoading: false });
        }

        return "Supplier deleted successfully";
    }
});

export default createSupplierSlice;
export type { ISupplierSlice }; 