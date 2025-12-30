import { StateCreator } from "zustand";

import { uomConversionAPI } from "@/api/clients/inventory/item-uom-conversion";
import { IChangeStatusConversion, IUOMConversion } from "@/models/types/inventory/item-uom-conversion";

interface IUOMConversionSlice {
    uomConversions: IUOMConversion[];
    isUOMConversionLoading: boolean;
    fetchUOMConversions: () => Promise<void>;
    createUOMConversion: (data: IUOMConversion, token?: string) => Promise<string>;
    changeStatusConversion: (data: IChangeStatusConversion, token?: string) => Promise<string>;
}

const createuomConversionSlice: StateCreator<IUOMConversionSlice> = (set) => ({
    uomConversions: [],
    isUOMConversionLoading: false,
    fetchUOMConversions: async () => {
        try {
            set({ isUOMConversionLoading: true });
            const data = await uomConversionAPI.getAll();
            set({ uomConversions: data }, false);
        } catch {
            // do something
        } finally {
            set({ isUOMConversionLoading: false });
        }
    },
    createUOMConversion: async (data, token) => {
        try {
            set({ isUOMConversionLoading: true });
            await uomConversionAPI.postUOMConversion(data, token);
        } catch {
            // do something
        } finally {
            set({ isUOMConversionLoading: false });
        }
        
        return "Item created successfully";
    },
    changeStatusConversion: async (data, token) => {
        try {
            set({ isUOMConversionLoading: true });
            await uomConversionAPI.changeStatusConversion(data, token);
        } catch {
            // do something
        } finally {
            set({ isUOMConversionLoading: false });
        }

        return "Item status updated successfully";
    }
});

export default createuomConversionSlice;
export type { IUOMConversionSlice }; 