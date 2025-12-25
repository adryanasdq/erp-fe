import type { StateCreator } from "zustand";

import type { IEmployee } from "@/models/types/hr/employee";
import { employeeAPI } from "@/api/clients/hr/employee";


interface IEmployeeSlice {
    employees: IEmployee[];
    isEmployeeLoading: boolean;
    fetchEmployees: () => Promise<void>;
    createEmployee: (data: IEmployee, token?: string) => Promise<string>;
    updateEmployee: (data: IEmployee, token?: string) => Promise<string>;
    deleteEmployee: (empId: string, token?: string) => Promise<string>;
}

const createEmployeeSlice: StateCreator<IEmployeeSlice> = (set) => ({
    employees: [],
    isEmployeeLoading: false,
    setEmployees: (employees) => set(() => ({ employees })),
    fetchEmployees: async () => {
        try {
            set({ isEmployeeLoading: true });
            const data = await employeeAPI.getAll();
            set({ employees: data }, false)
        } catch {
            // do something
        } finally {
            set({ isEmployeeLoading: false });
        }
    },
    createEmployee: async (data, token) => {
        try {
            set({ isEmployeeLoading: true });
            await employeeAPI.postEmployee(data, token);
        } catch {
            // do something
        } finally {
            set({ isEmployeeLoading: false });
        }
        
        return "Employee created successfully";
    },
    updateEmployee: async (data, token) => {
        try {
            set({ isEmployeeLoading: true });
            await employeeAPI.updateEmployee(data, token);
        } catch {
            // do something
        } finally {
            set({ isEmployeeLoading: false });
        }

        return "Employee updated successfully";
    },
    deleteEmployee: async (empId, token) => {
        try {
            set({ isEmployeeLoading: true });
            await employeeAPI.deleteEmployee(empId, token);
        } catch {
            // do something
        } finally {
            set({ isEmployeeLoading: false });
        }
        
        return "Employee deleted successfully";
    }
});

export default createEmployeeSlice;
export type { IEmployeeSlice };