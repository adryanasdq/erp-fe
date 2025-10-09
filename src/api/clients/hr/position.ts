import type { IPosition } from "@/models/types/hr/position";
import { hrApiFetch } from "@/api/base";


interface PositionAPI {
    getAll: (token?: string) => Promise<IPosition[]>;
    getByID: (id: string, token?: string) => Promise<IPosition>;
}

const positionAPI: PositionAPI = {
    getAll: async (token) => {
        const res = await hrApiFetch(token).get<IPosition[]>("/positions");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await hrApiFetch(token).get<IPosition>(`/positions/${id}`);
        return res.data;
    }
}

export { positionAPI }