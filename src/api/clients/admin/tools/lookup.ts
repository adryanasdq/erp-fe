import { ILookupGroup, ILookupItem } from "@/models/types/admin/tools/lookup";
import { adminApiFetch } from "@/api/base";

interface LookupAPI {
    getGroup: (token?: string) => Promise<ILookupGroup[]>;
    getByGroupCode: (groupCode: string, token?: string) => Promise<ILookupItem[]>;
    getAll: (token?: string) => Promise<ILookupItem[]>;
    getByID: (id: string, token?: string) => Promise<ILookupItem>;
    postItem: (data: ILookupItem, token?: string) => Promise<ILookupItem>;
    updateItem: (data: ILookupItem, token?: string) => Promise<ILookupItem>;
    deleteItem: (itemId: string, token?: string) => Promise<string>;
}

const lookupAPI: LookupAPI = {
    getGroup: async (token) => {
        const res = await adminApiFetch(token).get<ILookupGroup[]>("/tools/lookup/group");
        return res.data;
    },
    getByGroupCode: async (groupCode, token) => {
        const res = await adminApiFetch(token).get<ILookupItem[]>(`/tools/lookup/${groupCode}`);
        return res.data;
    },
    getAll: async (token) => {
        const res = await adminApiFetch(token).get<ILookupItem[]>("/tools/lookup");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await adminApiFetch(token).get<ILookupItem>(`/tools/lookup/${id}`);
        return res.data;
    },
    postItem: async (data, token) => {
        const res = await adminApiFetch(token).post<ILookupItem>("/tools/lookup", data);
        return res.data;
    },
    updateItem: async (data, token) => {
        const res = await adminApiFetch(token).put<ILookupItem>(`/tools/lookup/${data.id}`, data);
        return res.data;
    },
    deleteItem: async (itemId, token) => {
        const res = await adminApiFetch(token).delete<{ message: string }>(`/tools/lookup/${itemId}`);
        return res.data.message;
    }
}

export { lookupAPI }