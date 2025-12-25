import type { IPosition } from "@/models/types/human-resource/position";
import { hrApiFetch } from "@/api/base";


interface PositionAPI {
    getAll: (token?: string) => Promise<IPosition[]>;
    getByID: (id: string, token?: string) => Promise<IPosition>;
    postPosition: (data: IPosition, token?: string) => Promise<IPosition>;
    updatePosition: (data: IPosition, token?: string) => Promise<IPosition>;
    deletePosition: (id: string, token?: string) => Promise<string>;
}

const positionAPI: PositionAPI = {
    getAll: async (token) => {
        const res = await hrApiFetch(token).get<IPosition[]>("/positions");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await hrApiFetch(token).get<IPosition>(`/positions/${id}`);
        return res.data;
    },
    postPosition: async (data: IPosition, token?: string) => {
        const res = await hrApiFetch(token).post<IPosition>("/positions", data);
        return res.data;
    },
    updatePosition: async (data: IPosition, token?: string) => {
        const res = await hrApiFetch(token).put<IPosition>(`/positions/${data.id}`, data);
        return res.data;
    },
    deletePosition: async (id: string, token?: string) => {
        const res = await hrApiFetch(token).delete<{ message: string }>(`/positions/${id}`);
        return res.data.message;
    }
}

export { positionAPI }