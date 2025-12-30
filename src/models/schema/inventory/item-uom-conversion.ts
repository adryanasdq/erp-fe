import { IUOMConversion } from "@/models/types/inventory/item-uom-conversion";

const DefaultUOMConversion: IUOMConversion = {
    id: '',
    item_id: '',
    from_uom_id: '',
    to_uom_id: '',
    factor: '',
    is_active: true,
    created_date: new Date(),
};

export { DefaultUOMConversion };
