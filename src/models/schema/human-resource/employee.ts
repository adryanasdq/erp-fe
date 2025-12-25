import { IEmployee } from "@/models/types/human-resource/employee";

const DefaultEmployee: IEmployee = {
    name: '',
    position_id: '',
    manager_id: '',
    hire_date: new Date(),
    status: 'Active',
    modified_date: new Date(),
};

export { DefaultEmployee };