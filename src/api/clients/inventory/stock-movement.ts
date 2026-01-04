import { IStockMovement, IStockTransfer } from "@/models/types/inventory/stock-movement";
import { inventoryApiFetch } from "@/api/base";

interface IStockMovementAPI {
    getAll: (token?: string) => Promise<IStockMovement[]>;
    getByID: (id: string, token?: string) => Promise<IStockMovement>;
    postStockMovement: (data: IStockMovement, token?: string) => Promise<IStockMovement>;
    postStockTransfer: (data: IStockTransfer, token?: string) => Promise<IStockTransfer>;
}

const stockMovementAPI: IStockMovementAPI = {
    getAll: async (token) => {
        const res = await inventoryApiFetch(token).get<IStockMovement[]>("/stock_movement");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await inventoryApiFetch(token).get<IStockMovement>(`/stock_movement/${id}`);
        return res.data;
    },
    postStockMovement: async (data: IStockMovement, token?: string) => {
        const res = await inventoryApiFetch(token).post<IStockMovement>("/stock_movement", data);
        return res.data;
    },
    postStockTransfer: async (data: IStockTransfer, token?: string) => {
        const res = await inventoryApiFetch(token).post<IStockTransfer>("/stock_movement/transfer", data);
        return res.data;
    }
}

export { stockMovementAPI }