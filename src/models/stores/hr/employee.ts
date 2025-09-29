import type { StateCreator } from "zustand";
import type { IEmployee } from "../../types/hr/employee";
import { employeeAPI } from "../../../api/clients/employee";


interface IEmployeeSlice {
    employees: IEmployee[];
    setEmployees: (employee: IEmployee[]) => void;
    isLoading: boolean;
    fetchEmployees: () => Promise<void>;
}

const createEmployeeSlice: StateCreator<IEmployeeSlice> = (set) => ({
    employees: [],
    isLoading: false,
    setEmployees: (employees) => set(() => ({ employees })),
    fetchEmployees: async () => {
        try {
            set({ isLoading: true });
            const data = await employeeAPI.getAll();
            set({ employees: data }, false)
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    }
});

export default createEmployeeSlice;
export type { IEmployeeSlice };