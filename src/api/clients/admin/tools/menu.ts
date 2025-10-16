import type { IMenuItem } from "src/models/types/admin/tools/menu";
import { adminApiFetch } from "@/api/base";


interface MenuAPI {
    getAll: (token?: string) => Promise<IMenuItem[]>;
    getByID: (id: number, token?: string) => Promise<IMenuItem>;
    postMenu: (data: IMenuItem, token?: string) => Promise<IMenuItem>;
    updateMenu: (data: IMenuItem, token?: string) => Promise<IMenuItem>;
    deleteMenu: (menuId: number, token?: string) => Promise<string>;
}

const menuAPI: MenuAPI = {
    getAll: async (token) => {
        const res = await adminApiFetch(token).get<IMenuItem[]>("/tools/menus");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await adminApiFetch(token).get<IMenuItem>(`/tools/menus/${id}`);
        return res.data;
    },
    postMenu: async (data, token) => {
        const res = await adminApiFetch(token).post<IMenuItem>("/tools/menus", data);
        return res.data;
    },
    updateMenu: async (data, token) => {
        const res = await adminApiFetch(token).put<IMenuItem>(`/tools/menus/${data.id}`, data);
        return res.data;
    },
    deleteMenu: async (menuId, token) => {
        const res = await adminApiFetch(token).delete<{ message: string }>(`/tools/menus/${menuId}`);
        return res.data.message;
    }
}

export { menuAPI }