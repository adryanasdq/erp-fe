import type { StateCreator } from "zustand";

import type { IMenuItem } from "src/models/types/admin/tools/menu";
import { menuAPI } from "src/api/clients/admin/tools/menu";


interface IMenuSlice {
    menus: IMenuItem[];
    isMenuLoading: boolean;
    fetchMenus: () => Promise<void>;
    createMenu: (data: IMenuItem, token?: string) => Promise<string>;
    updateMenu: (data: IMenuItem, token?: string) => Promise<string>;
    deleteMenu: (menuId: string, token?: string) => Promise<string>;
}

const createMenuSlice: StateCreator<IMenuSlice> = (set) => ({
    menus: [],
    isMenuLoading: false,
    fetchMenus: async () => {
        try {
            set({ isMenuLoading: true });
            const data = await menuAPI.getAll();
            set({ menus: data }, false)
        } catch {
            // do something
        } finally {
            set({ isMenuLoading: false });
        }
    },
    createMenu: async (data, token) => {
        try {
            set({ isMenuLoading: true });
            await menuAPI.postMenu(data, token);
        } catch {
            // do something
        } finally {
            set({ isMenuLoading: false });
        }
        
        return "Menu created successfully";
    },
    updateMenu: async (data, token) => {
        try {
            set({ isMenuLoading: true });
            await menuAPI.updateMenu(data, token);
        } catch {
            // do something
        } finally {
            set({ isMenuLoading: false });
        }

        return "Menu updated successfully";
    },
    deleteMenu: async (menuId, token) => {
        try {
            set({ isMenuLoading: true });
            await menuAPI.deleteMenu(menuId, token);
        } catch {
            // do something
        } finally {
            set({ isMenuLoading: false });
        }

        return "Menu deleted successfully";
    }
})

export default createMenuSlice;
export type { IMenuSlice };