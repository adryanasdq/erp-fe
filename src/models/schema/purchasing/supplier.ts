import { ISupplier } from "@/models/types/purchasing/supplier";

const DefaultSupplier: ISupplier = {
    id: '',
    code: '',
    name: '',
    status: 'ACTIVE',
    modified_date: new Date(),
};

export { DefaultSupplier };