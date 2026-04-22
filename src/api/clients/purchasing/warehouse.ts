import { ISupplier } from "@/models/types/purchasing/supplier";
import { purchasingApiFetch } from "@/api/base";

interface SupplierAPI {
    getAll: (token?: string) => Promise<ISupplier[]>;
    getByID: (id: string, token?: string) => Promise<ISupplier>;
    postSupplier: (data: ISupplier, token?: string) => Promise<ISupplier>;
    updateSupplier: (data: ISupplier, token?: string) => Promise<ISupplier>;
    deleteSupplier: (id: string, token?: string) => Promise<string>;
}

const supplierAPI: SupplierAPI = {
    getAll: async (token) => {
        const res = await purchasingApiFetch(token).get<ISupplier[]>("/suppliers");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await purchasingApiFetch(token).get<ISupplier>(`/suppliers/${id}`);
        return res.data;
    },
    postSupplier: async (data: ISupplier, token?: string) => {
        const res = await purchasingApiFetch(token).post<ISupplier>("/suppliers", data);
        return res.data;
    },
    updateSupplier: async (data: ISupplier, token?: string) => {
        const res = await purchasingApiFetch(token).put<ISupplier>(`/suppliers/${data.id}`, data);
        return res.data;
    },
    deleteSupplier: async (id: string, token?: string) => {
        const res = await purchasingApiFetch(token).delete<{ message: string }>(`/suppliers/${id}`);
        return res.data.message;
    }
}

export { supplierAPI };
