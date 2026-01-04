interface IStockMovement {
    id?: string;
    item_id: string;
    qty: number;
    type: string;
    uom_id: string;
    warehouse_id: string;
    created_date?: Date;
}

interface IStockTransfer {
    item_id: string;
    qty: number;
    from_warehouse_id: string;
    to_warehouse_id: string;
    uom_id: string;
}

interface IFormModal {
    type: string;
    item_id: string;
    qty: number;
    uom_id: string;
    warehouse_id: string;
    from_warehouse_id?: string;
    to_warehouse_id?: string;
}

export type { IStockMovement, IStockTransfer, IFormModal };
