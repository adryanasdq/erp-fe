import { IEmployee } from "@/models/types/hr/employee";

const DefaultEmployee: IEmployee = {
    name: '',
    position_id: '',
    manager_id: '',
    hire_date: new Date(),
    status: 'active',
    modified_date: new Date(),
};

export { DefaultEmployee };