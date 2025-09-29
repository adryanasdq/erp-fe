type MenuItem = {
    id: number;
    parentId?: number | null;
    title: string;
    url?: string | null;
    open?: boolean;
    children?: MenuItem[];
};

export type { MenuItem };