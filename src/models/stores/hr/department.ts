import type { StateCreator } from "zustand";

import type { IDepartment } from "@/models/types/hr/department";
import { departmentAPI } from "@/api/clients/hr/department";


interface IDepartmentSlice {
    departments: IDepartment[];
    isDepartmentLoading: boolean;
    fetchDepartments: () => Promise<void>;
    createDepartment: (data: IDepartment, token?: string) => Promise<string>;
    updateDepartment: (data: IDepartment, token?: string) => Promise<string>;
    deleteDepartment: (empId: string, token?: string) => Promise<string>;
}

const createDepartmentSlice: StateCreator<IDepartmentSlice> = (set) => ({
    departments: [],
    isDepartmentLoading: false,
    setDepartment: (departments) => set(() => ({ departments })),
    fetchDepartments: async () => {
        try {
            set({ isDepartmentLoading: true });
            const data = await departmentAPI.getAll();
            set({ departments: data }, false)
        } catch {
            // do something
        } finally {
            set({ isDepartmentLoading: false });
        }
    },
    createDepartment: async (data, token) => {
        try {
            set({ isDepartmentLoading: true });
            await departmentAPI.postDepartment(data, token);
        } catch {
            // do something
        } finally {
            set({ isDepartmentLoading: false });
        }
        
        return "Employee created successfully";
    },
    updateDepartment: async (data, token) => {
        try {
            set({ isDepartmentLoading: true });
            await departmentAPI.updateDepartment(data, token);
        } catch {
            // do something
        } finally {
            set({ isDepartmentLoading: false });
        }

        return "Employee updated successfully";
    },
    deleteDepartment: async (empId, token) => {
        try {
            set({ isDepartmentLoading: true });
            await departmentAPI.deleteDepartment(empId, token);
        } catch {
            // do something
        } finally {
            set({ isDepartmentLoading: false });
        }
        
        return "Employee deleted successfully";
    }
});

export default createDepartmentSlice;
export type { IDepartmentSlice };