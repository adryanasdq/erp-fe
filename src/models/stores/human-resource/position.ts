import type { StateCreator } from "zustand";

import type { IPosition } from "@/models/types/human-resource/position";
import { positionAPI } from "@/api/clients/human-resource/position";


interface IPositionSlice {
    positions: IPosition[];
    isPositionLoading: boolean;
    fetchPositions: () => Promise<void>;
    createPosition: (data: IPosition, token?: string) => Promise<string>;
    updatePosition: (data: IPosition, token?: string) => Promise<string>;
    deletePosition: (empId: string, token?: string) => Promise<string>;
}

const createPositionSlice: StateCreator<IPositionSlice> = (set) => ({
    positions: [],
    isPositionLoading: false,
    fetchPositions: async () => {
        try {
            set({ isPositionLoading: true });
            const data = await positionAPI.getAll();
            set({ positions: data }, false)
        } catch {
            // do something
        } finally {
            set({ isPositionLoading: false });
        }
    },
    createPosition: async (data, token) => {
        try {
            set({ isPositionLoading: true });
            await positionAPI.postPosition(data, token);
        } catch {
            // do something
        } finally {
            set({ isPositionLoading: false });
        }
        
        return "Position created successfully";
    },
    updatePosition: async (data, token) => {
        try {
            set({ isPositionLoading: true });
            await positionAPI.updatePosition(data, token);
        } catch {
            // do something
        } finally {
            set({ isPositionLoading: false });
        }

        return "Position updated successfully";
    },
    deletePosition: async (empId, token) => {
        try {
            set({ isPositionLoading: true });
            await positionAPI.deletePosition(empId, token);
        } catch {
            // do something
        } finally {
            set({ isPositionLoading: false });
        }

        return "Position deleted successfully";
    }
});

export default createPositionSlice;
export type { IPositionSlice };