import type { IDepartment } from "./department";

interface IPosition {
    id: string;
    title: string;
    description: string;
    department_id: string;
    modified_date: Date;
    department: IDepartment;
}

export type { IPosition }