import { IPosition } from "@/models/types/human-resource/position";

const DefaultPosition: IPosition = {
    id: '',
    title: '',
    description: '',
    department_id: '',
    modified_date: new Date(),
};

export { DefaultPosition };