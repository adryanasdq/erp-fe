import { IFormModal } from "@/models/types/inventory/stock-movement";

const DefaultFormModal: IFormModal = {
    item_id: '',
    qty: 0,
    type: '',
    uom_id: '',
    warehouse_id: '',
    from_warehouse_id: '',
    to_warehouse_id: '',
}

export { DefaultFormModal };