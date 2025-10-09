import type { StateCreator } from "zustand";

import type { IPosition } from "@/models/types/hr/position";
import { positionAPI } from "@/api/clients/hr/position";


interface IPositionSlice {
    positions: IPosition[];
    setPositions: (position: IPosition[]) => void;
    isLoading: boolean;
    fetchPositions: () => Promise<void>;
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
    }
});

export default createPositionSlice;
export type { IPositionSlice };