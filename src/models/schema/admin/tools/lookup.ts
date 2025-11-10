import { ILookupItem } from "@/models/types/admin/tools/lookup";

const DefaultLookupItem: ILookupItem = {
    group_code: '',
    group_desc: '',
    label: '',
    value: '',
    order_index: 0,
    is_hidden: false,
    modified_date: new Date(),
};

export { DefaultLookupItem };