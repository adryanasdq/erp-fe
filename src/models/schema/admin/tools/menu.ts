import { IMenuItem } from "@/models/types/admin/tools/menu"

const DefaultMenuItem: IMenuItem = {
    id: null,
    title: '',
    url: '',
    icon: null,
    parent_id: null,
    order_index: null,
    is_hidden: false,
    modified_date: null,
    children: []
};

export { DefaultMenuItem };