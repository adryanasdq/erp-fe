import type { IEmployee } from "@/models/types/human-resource/employee";
import { hrApiFetch } from "@/api/base";


interface EmployeeAPI {
    getAll: (token?: string) => Promise<IEmployee[]>;
    getByID: (id: string, token?: string) => Promise<IEmployee>;
    postEmployee: (data: IEmployee, token?: string) => Promise<IEmployee>;
    updateEmployee: (data: IEmployee, token?: string) => Promise<IEmployee>;
    deleteEmployee: (empId: string, token?: string) => Promise<string>;
}

const employeeAPI: EmployeeAPI = {
    getAll: async (token) => {
        const res = await hrApiFetch(token).get<IEmployee[]>("/employees");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await hrApiFetch(token).get<IEmployee>(`/employees/${id}`);
        return res.data;
    },
    postEmployee: async (data: IEmployee, token) => {
        const res = await hrApiFetch(token).post<IEmployee>("/employees", data);
        return res.data;
    },
    updateEmployee: async (data: IEmployee, token) => {
        const res = await hrApiFetch(token).put<IEmployee>(`/employees/${data.id}`, data);
        return res.data;
    },
    deleteEmployee: async (empId, token) => {
        const res = await hrApiFetch(token).delete<{ message: string }>(`/employees/${empId}`);
        return res.data.message;
    }
}

export { employeeAPI }