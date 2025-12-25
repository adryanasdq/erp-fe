import { IItem } from "@/models/types/inventory/item";

const DefaultItem: IItem = {
    id: '',
    name: '',
    sku: '',
    uom_id: '',
    category: '',
    is_hidden: false,
    modified_date: new Date(),
};

export { DefaultItem };