import { StateCreator } from "zustand";

import { uomAPI } from "@/api/clients/inventory/uom";
import { IUOM } from "@/models/types/inventory/uom";

interface IUOMSlice {
    uoms: IUOM[];
    isUOMLoading: boolean;
    fetchUOMs: () => Promise<void>;
    createUOM: (data: IUOM, token?: string) => Promise<string>;
    updateUOM: (data: IUOM, token?: string) => Promise<string>;
    deleteUOM: (uomId: string, token?: string) => Promise<string>;
}

const createUOMSlice: StateCreator<IUOMSlice> = (set) => ({
    uoms: [],
    isUOMLoading: false,
    fetchUOMs: async () => {
        try {
            set({ isUOMLoading: true });
            const data = await uomAPI.getAll();
            set({ uoms: data }, false)
        } catch {
            // do something
        } finally {
            set({ isUOMLoading: false });
        }
    },
    createUOM: async (data, token) => {
        try {
            set({ isUOMLoading: true });
            await uomAPI.postUOM(data, token);
        } catch {
            // do something
        } finally {
            set({ isUOMLoading: false });
        }
        
        return "UOM created successfully";
    },
    updateUOM: async (data, token) => {
        try {
            set({ isUOMLoading: true });
            await uomAPI.updateUOM(data, token);
        } catch {
            // do something
        } finally {
            set({ isUOMLoading: false });
        }

        return "UOM updated successfully";
    },
    deleteUOM: async (uomId, token) => {
        try {
            set({ isUOMLoading: true });
            await uomAPI.deleteUOM(uomId, token);
        } catch {
            // do something
        } finally {
            set({ isUOMLoading: false });
        }

        return "UOM deleted successfully";
    }
});

export default createUOMSlice;
export type { IUOMSlice }; 