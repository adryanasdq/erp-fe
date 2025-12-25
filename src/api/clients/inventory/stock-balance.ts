import { IStockBalance } from "@/models/types/inventory/stock-balance";
import { inventoryApiFetch } from "@/api/base";

interface IStockBalanceAPI {
    getAll: (token?: string) => Promise<IStockBalance[]>;
    getByID: (id: string, token?: string) => Promise<IStockBalance>;
}

const stockBalanceAPI: IStockBalanceAPI = {
    getAll: async (token) => {
        const res = await inventoryApiFetch(token).get<IStockBalance[]>("/stock_balances");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await inventoryApiFetch(token).get<IStockBalance>(`/stock_balances/${id}`);
        return res.data;
    }
}

export { stockBalanceAPI }