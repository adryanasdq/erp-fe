import { IItem } from "@/models/types/inventory/item";
import { inventoryApiFetch } from "@/api/base";

interface ItemAPI {
    getAll: (token?: string) => Promise<IItem[]>;
    getByID: (id: string, token?: string) => Promise<IItem>;
    postItem: (data: IItem, token?: string) => Promise<IItem>;
    updateItem: (data: IItem, token?: string) => Promise<IItem>;
    deleteItem: (id: string, token?: string) => Promise<string>;
}

const itemAPI: ItemAPI = {
    getAll: async (token) => {
        const res = await inventoryApiFetch(token).get<IItem[]>("/items");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await inventoryApiFetch(token).get<IItem>(`/items/${id}`);
        return res.data;
    },
    postItem: async (data: IItem, token?: string) => {
        const res = await inventoryApiFetch(token).post<IItem>("/items", data);
        return res.data;
    },
    updateItem: async (data: IItem, token?: string) => {
        const res = await inventoryApiFetch(token).put<IItem>(`/items/${data.id}`, data);
        return res.data;
    },
    deleteItem: async (id: string, token?: string) => {
        const res = await inventoryApiFetch(token).delete<{ message: string }>(`/items/${id}`);
        return res.data.message;
    }
}

export { itemAPI }