import type { IEmployee } from "@/models/types/hr/employee";
import { hrApiFetch } from "@/api/base";


interface EmployeeAPI {
    getAll: (token?: string) => Promise<IEmployee[]>;
    getByID: (id: string, token?: string) => Promise<IEmployee>;
}

const employeeAPI: EmployeeAPI = {
    getAll: async (token) => {
        const res = await hrApiFetch(token).get<IEmployee[]>("/employees");
        return res.data;
    },
    getByID: async (id, token) => {
        const res = await hrApiFetch(token).get<IEmployee>(`/employee/${id}`);
        return res.data;
    }
}

export { employeeAPI }