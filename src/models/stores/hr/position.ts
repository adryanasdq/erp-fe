import type { StateCreator } from "zustand";

import type { IPosition } from "@/models/types/hr/position";
import { positionAPI } from "@/api/clients/hr/position";


interface IPositionSlice {
    positions: IPosition[];
    setPositions: (position: IPosition[]) => void;
    isLoading: boolean;
    fetchPositions: () => Promise<void>;
    createPosition: (data: IPosition, token?: string) => Promise<string>;
    updatePosition: (data: IPosition, token?: string) => Promise<string>;
    deletePosition: (empId: string, token?: string) => Promise<string>;
}

const createPositionSlice: StateCreator<IPositionSlice> = (set) => ({
    positions: [],
    isLoading: false,
    setPositions: (positions) => set(() => ({ positions })),
    fetchPositions: async () => {
        try {
            set({ isLoading: true });
            const data = await positionAPI.getAll();
            set({ positions: data }, false)
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    },
    createPosition: async (data, token) => {
        try {
            set({ isLoading: true });
            await positionAPI.postPosition(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Position created successfully";
    },
    updatePosition: async (data, token) => {
        try {
            set({ isLoading: true });
            await positionAPI.updatePosition(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Position updated successfully";
    },
    deletePosition: async (empId, token) => {
        try {
            set({ isLoading: true });
            await positionAPI.deletePosition(empId, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Position deleted successfully";
    }
});

export default createPositionSlice;
export type { IPositionSlice };