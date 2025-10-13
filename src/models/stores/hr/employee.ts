import type { StateCreator } from "zustand";

import type { IEmployee } from "@/models/types/hr/employee";
import { employeeAPI } from "@/api/clients/hr/employee";


interface IEmployeeSlice {
    employees: IEmployee[];
    setEmployees: (employee: IEmployee[]) => void;
    isLoading: boolean;
    fetchEmployees: () => Promise<void>;
    createEmployee: (data: IEmployee, token?: string) => Promise<string>;
    updateEmployee: (data: IEmployee, token?: string) => Promise<string>;
    deleteEmployee: (empId: string, token?: string) => Promise<string>;
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
    },
    createEmployee: async (data, token) => {
        try {
            set({ isLoading: true });
            await employeeAPI.postEmployee(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Employee created successfully";
    },
    updateEmployee: async (data, token) => {
        try {
            set({ isLoading: true });
            await employeeAPI.updateEmployee(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Employee updated successfully";
    },
    deleteEmployee: async (empId, token) => {
        try {
            set({ isLoading: true });
            await employeeAPI.deleteEmployee(empId, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Employee deleted successfully";
    }
});

export default createEmployeeSlice;
export type { IEmployeeSlice };