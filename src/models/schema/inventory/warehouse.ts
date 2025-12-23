import { IWarehouse } from "@/models/types/inventory/warehouse";

const DefaultWarehouse: IWarehouse = {
    id: '',
    name: '',
    location: '',
    modified_date: new Date(),
};

export { DefaultWarehouse };