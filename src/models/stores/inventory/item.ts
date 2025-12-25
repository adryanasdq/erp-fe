import { StateCreator } from "zustand";

import { itemAPI } from "@/api/clients/inventory/item";
import { IItem } from "@/models/types/inventory/item";

interface IItemSlice {
    items: IItem[];
    isItemLoading: boolean;
    fetchItems: () => Promise<void>;
    createItem: (data: IItem, token?: string) => Promise<string>;
    updateItem: (data: IItem, token?: string) => Promise<string>;
    deleteItem: (itemId: string, token?: string) => Promise<string>;
}

const createItemSlice: StateCreator<IItemSlice> = (set) => ({
    items: [],
    isItemLoading: false,
    fetchItems: async () => {
        try {
            set({ isItemLoading: true });
            const data = await itemAPI.getAll();
            set({ items: data }, false)
        } catch {
            // do something
        } finally {
            set({ isItemLoading: false });
        }
    },
    createItem: async (data, token) => {
        try {
            set({ isItemLoading: true });
            await itemAPI.postItem(data, token);
        } catch {
            // do something
        } finally {
            set({ isItemLoading: false });
        }
        
        return "Item created successfully";
    },
    updateItem: async (data, token) => {
        try {
            set({ isItemLoading: true });
            await itemAPI.updateItem(data, token);
        } catch {
            // do something
        } finally {
            set({ isItemLoading: false });
        }

        return "Item updated successfully";
    },
    deleteItem: async (empId, token) => {
        try {
            set({ isItemLoading: true });
            await itemAPI.deleteItem(empId, token);
        } catch {
            // do something
        } finally {
            set({ isItemLoading: false });
        }

        return "Item deleted successfully";
    }
});

export default createItemSlice;
export type { IItemSlice }; 