import type { StateCreator } from "zustand";

import type { IDepartment } from "@/models/types/hr/department";
import { departmentAPI } from "@/api/clients/hr/department";


interface IDepartmentSlice {
    departments: IDepartment[];
    setDepartment: (department: IDepartment[]) => void;
    isLoading: boolean;
    fetchDepartments: () => Promise<void>;
    createDepartment: (data: IDepartment, token?: string) => Promise<string>;
    updateDepartment: (data: IDepartment, token?: string) => Promise<string>;
    deleteDepartment: (empId: string, token?: string) => Promise<string>;
}

const createDepartmentSlice: StateCreator<IDepartmentSlice> = (set) => ({
    departments: [],
    isLoading: false,
    setDepartment: (departments) => set(() => ({ departments })),
    fetchDepartments: async () => {
        try {
            set({ isLoading: true });
            const data = await departmentAPI.getAll();
            set({ departments: data }, false)
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
    },
    createDepartment: async (data, token) => {
        try {
            set({ isLoading: true });
            await departmentAPI.postDepartment(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Employee created successfully";
    },
    updateDepartment: async (data, token) => {
        try {
            set({ isLoading: true });
            await departmentAPI.updateDepartment(data, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }

        return "Employee updated successfully";
    },
    deleteDepartment: async (empId, token) => {
        try {
            set({ isLoading: true });
            await departmentAPI.deleteDepartment(empId, token);
        } catch {
            // do something
        } finally {
            set({ isLoading: false });
        }
        
        return "Employee deleted successfully";
    }
});

export default createDepartmentSlice;
export type { IDepartmentSlice };