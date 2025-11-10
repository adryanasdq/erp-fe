interface ILookupItem {
    id?: string | null;
    group_code: string;
    group_desc: string;
    value: string;
    label: string;
    order_index?: number | null;
    is_hidden?: boolean | null;
    modified_date?: Date | null;
}

interface ILookupGroup {
    id?: string | null;
    group_code: string;
    group_desc: string;
}

export type { ILookupItem, ILookupGroup };