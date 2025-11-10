import { StateCreator } from "zustand";

import { ILookupGroup, ILookupItem } from "@/models/types/admin/tools/lookup";
import { lookupAPI } from "@/api/clients/admin/tools/lookup";

interface ILookupSlice {
    lookupGroups: ILookupGroup[];
    lookupItems: ILookupItem[];
    isLoading: boolean;
    fetchLookupGroups: () => Promise<void>;
    fetchLookupItems: () => Promise<void>;
    fetchLookupItemsByGroupCode: (groupCode: string) => Promise<void>;
    createLookupItem: (data: ILookupItem, token?: string) => Promise<string>;
    updateLookupItem: (data: ILookupItem, token?: string) => Promise<string>;
    deleteLookupItem: (itemId: string, token?: string) => Promise<string>;
}

const createLookupSlice: StateCreator<ILookupSlice> = (set) => ({
    lookupGroups: [],
    lookupItems: [],
    isLoading: false,
    fetchLookupGroups: async () => {
        try {
            set({ isLoading: true });
            const data = await lookupAPI.getGroup();
            set({ lookupGroups: data }, false);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    },
    fetchLookupItems: async () => {
        try {
            set({ isLoading: true });
            const data = await lookupAPI.getAll();
            set({ lookupItems: data }, false)
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    },
    fetchLookupItemsByGroupCode: async (groupCode) => {
        try {
            set({ isLoading: true });
            const data = await lookupAPI.getByGroupCode(groupCode);
            set({ lookupItems: data }, false);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    },
    createLookupItem: async (data, token) => {
        try {
            set({ isLoading: true });
            await lookupAPI.postItem(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Lookup item created successfully";
    },
    updateLookupItem: async (data, token) => {
        try {
            set({ isLoading: true });
            await lookupAPI.updateItem(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Lookup item updated successfully";
    },
    deleteLookupItem: async (itemId, token) => {
        try {
            set({ isLoading: true });
            await lookupAPI.deleteItem(itemId, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Lookup item deleted successfully";
    }
});

export default createLookupSlice;
export type { ILookupSlice };