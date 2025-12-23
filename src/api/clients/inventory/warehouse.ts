import { IWarehouse } from "@/models/types/inventory/warehouse";
import { inventoryApiFetch } from "@/api/base";

interface WarehouseAPI {
    getAll: (token?: string) => Promise<IWarehouse[]>;
    getByID: (id: string, token?: string) => Promise<IWarehouse>;
    postWarehouse: (data: IWarehouse, token?: string) => Promise<IWarehouse>;
    updateWarehouse: (data: IWarehouse, token?: string) => Promise<IWarehouse>;
    deleteWarehouse: (id: string, token?: string) => Promise<string>;
}

const warehouseAPI: WarehouseAPI = {
    getAll: async (token) => {
        const res = await inventoryApiFetch(token).get<IWarehouse[]>("/warehouses");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await inventoryApiFetch(token).get<IWarehouse>(`/warehouses/${id}`);
        return res.data;
    },
    postWarehouse: async (data: IWarehouse, token?: string) => {
        const res = await inventoryApiFetch(token).post<IWarehouse>("/warehouses", data);
        return res.data;
    },
    updateWarehouse: async (data: IWarehouse, token?: string) => {
        const res = await inventoryApiFetch(token).put<IWarehouse>(`/warehouses/${data.id}`, data);
        return res.data;
    },
    deleteWarehouse: async (id: string, token?: string) => {
        const res = await inventoryApiFetch(token).delete<{ message: string }>(`/warehouses/${id}`);
        return res.data.message;
    }
}

export { warehouseAPI }