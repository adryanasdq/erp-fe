import type { IDepartment } from "@/models/types/hr/department";
import { hrApiFetch } from "@/api/base";


interface DepartmentAPI {
    getAll: (token?: string) => Promise<IDepartment[]>;
    getByID: (id: string, token?: string) => Promise<IDepartment>;
    postDepartment: (data: IDepartment, token?: string) => Promise<IDepartment>;
    updateDepartment: (data: IDepartment, token?: string) => Promise<IDepartment>;
    deleteDepartment: (empId: string, token?: string) => Promise<string>;
}

const departmentAPI: DepartmentAPI = {
    getAll: async (token) => {
        const res = await hrApiFetch(token).get<IDepartment[]>("/departments");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await hrApiFetch(token).get<IDepartment>(`/departments/${id}`);
        return res.data;
    },
    postDepartment: async (data: IDepartment, token) => {
        const res = await hrApiFetch(token).post<IDepartment>("/departments", data);
        return res.data;
    },
    updateDepartment: async (data: IDepartment, token) => {
        const res = await hrApiFetch(token).put<IDepartment>(`/departments/${data.id}`, data);
        return res.data;
    },
    deleteDepartment: async (empId, token) => {
        const res = await hrApiFetch(token).delete<{ message: string }>(`/departments/${empId}`);
        return res.data.message;
    }
}

export { departmentAPI }