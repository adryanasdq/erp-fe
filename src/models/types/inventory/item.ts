interface IItem {
    id?: string;
    name: string;
    sku: string;
    category: string;
    uom_id: string;
    is_hidden: boolean;
    modified_date: Date;
}

export type { IItem }