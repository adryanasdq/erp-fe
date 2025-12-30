interface IUOMConversion {
    id?: string;
    item_id: string;
    from_uom_id: string;
    to_uom_id: string;
    factor: string;
    is_active: boolean;
    created_date: Date
}

interface IChangeStatusConversion {
    id?: string;
    is_active: boolean;
}

export type { IUOMConversion, IChangeStatusConversion }
