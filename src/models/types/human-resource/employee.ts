import type { IPosition } from "./position";

interface IEmployee {
    id?: string;
    name: string;
    position_id: string;
    manager_id: string;
    hire_date?: Date;
    status?: string;
    modified_date?: Date;
    position?: IPosition;
}

export type { IEmployee }