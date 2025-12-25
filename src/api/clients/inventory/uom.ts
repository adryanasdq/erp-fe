import { IUOM } from "@/models/types/inventory/uom";
import { inventoryApiFetch } from "@/api/base";

interface UOMAPI {
    getAll: (token?: string) => Promise<IUOM[]>;
    getByID: (id: string, token?: string) => Promise<IUOM>;
    postUOM: (data: IUOM, token?: string) => Promise<IUOM>;
    updateUOM: (data: IUOM, token?: string) => Promise<IUOM>;
    deleteUOM: (id: string, token?: string) => Promise<string>;
}

const uomAPI: UOMAPI = {
    getAll: async (token) => {
        const res = await inventoryApiFetch(token).get<IUOM[]>("/uom");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await inventoryApiFetch(token).get<IUOM>(`/uom/${id}`);
        return res.data;
    },
    postUOM: async (data: IUOM, token?: string) => {
        const res = await inventoryApiFetch(token).post<IUOM>("/uom", data);
        return res.data;
    },
    updateUOM: async (data: IUOM, token?: string) => {
        const res = await inventoryApiFetch(token).put<IUOM>(`/uom/${data.id}`, data);
        return res.data;
    },
    deleteUOM: async (id: string, token?: string) => {
        const res = await inventoryApiFetch(token).delete<{ message: string }>(`/uom/${id}`);
        return res.data.message;
    }
}

export { uomAPI }