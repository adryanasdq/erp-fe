import { IChangeStatusConversion, IUOMConversion } from "@/models/types/inventory/item-uom-conversion";
import { inventoryApiFetch } from "@/api/base";

interface IUOMConversionAPI {
    getAll: (token?: string) => Promise<IUOMConversion[]>;
    getByID: (id: string, token?: string) => Promise<IUOMConversion>;
    postUOMConversion: (data: IUOMConversion, token?: string) => Promise<IUOMConversion>;
    changeStatusConversion: (data: IChangeStatusConversion, token?: string) => Promise<IUOMConversion>;
}

const uomConversionAPI: IUOMConversionAPI = {
    getAll: async (token) => {
        const res = await inventoryApiFetch(token).get<IUOMConversion[]>("/item_uom_conversion");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await inventoryApiFetch(token).get<IUOMConversion>(`/item_uom_conversion/${id}`);
        return res.data;
    },
    postUOMConversion: async (data: IUOMConversion, token?: string) => {
        const res = await inventoryApiFetch(token).post<IUOMConversion>("/item_uom_conversion", data);
        return res.data;
    },
    changeStatusConversion: async (data: IChangeStatusConversion, token?: string) => {
        const res = await inventoryApiFetch(token).patch<IUOMConversion>(`/item_uom_conversion/${data.id}`, data);
        return res.data;
    },
}

export { uomConversionAPI }