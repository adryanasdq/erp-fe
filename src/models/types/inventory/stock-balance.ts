interface IStockBalance {
    id?: string;
    item_id: string;
    warehouse_id: string;
    qty: number;
    qty_reserved: number;
    modified_date: Date;
}

export type { IStockBalance }