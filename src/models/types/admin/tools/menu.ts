interface IMenuItem {
    id: number;
    title: string;
    url?: string | null;
    icon?: string | null;
    parent_id?: number | null;
    order_index?: number | null;
    is_hidden?: boolean | null;
    modified_date?: string | null;
    children?: IMenuItem[];
};

export type { IMenuItem };