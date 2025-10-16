import type { StateCreator } from "zustand";

import type { IMenuItem } from "src/models/types/admin/tools/menu";
import { menuAPI } from "src/api/clients/admin/tools/menu";


interface IMenuSlice {
    menus: IMenuItem[];
    setMenus: (menus: IMenuItem[]) => void;
    isLoading: boolean;
    fetchMenus: () => Promise<void>;
    createMenu: (data: IMenuItem, token?: string) => Promise<string>;
    updateMenu: (data: IMenuItem, token?: string) => Promise<string>;
    deleteMenu: (menuId: number, token?: string) => Promise<string>;
}

const createMenuSlice: StateCreator<IMenuSlice> = (set) => ({
    menus: [],
    isLoading: false,
    setMenus: (menus) => set(() => ({ menus })),
    fetchMenus: async () => {
        try {
            set({ isLoading: true });
            const data = await menuAPI.getAll();
            set({ menus: data }, false)
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    },
    createMenu: async (data, token) => {
        try {
            set({ isLoading: true });
            await menuAPI.postMenu(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Menu created successfully";
    },
    updateMenu: async (data, token) => {
        try {
            set({ isLoading: true });
            await menuAPI.updateMenu(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Menu updated successfully";
    },
    deleteMenu: async (menuId, token) => {
        try {
            set({ isLoading: true });
            await menuAPI.deleteMenu(menuId, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Menu deleted successfully";
    }
})

export default createMenuSlice;
export type { IMenuSlice };