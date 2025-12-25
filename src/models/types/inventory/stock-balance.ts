interface IStockBalance {
    id?: string;
    item_id: string;
    warehouse_id: string;
    qty: number;
    qty_reserved: number;
    qty_available: number;
    modified_date: Date;
}

export type { IStockBalance }