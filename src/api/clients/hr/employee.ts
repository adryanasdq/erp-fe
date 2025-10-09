import type { IEmployee } from "@/models/types/hr/employee";
import { hrApiFetch } from "@/api/base";


interface EmployeeAPI {
    getAll: (token?: string) => Promise<IEmployee[]>;
    getByID: (id: string, token?: string) => Promise<IEmployee>;
    postEmployee: (data: IEmployee, token?: string) => Promise<IEmployee>;
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
    }
}

export { employeeAPI }