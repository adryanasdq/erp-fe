import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createMenuSlice from "./admin/tools/menu";
import createLookupSlice from "./admin/tools/lookup";
import createEmployeeSlice from "./human-resource/employee";
import createPositionSlice from "./human-resource/position";
import createDepartmentSlice from "./human-resource/department";
import createWarehouseSlice from "./inventory/warehouse";
import createUOMSlice from "./inventory/uom";
import createItemSlice from "./inventory/item";

import type { IMenuSlice } from "./admin/tools/menu";
import type { IDepartmentSlice } from "./human-resource/department";
import type { IEmployeeSlice } from "./human-resource/employee";
import type { IPositionSlice } from "./human-resource/position";
import type { ILookupSlice } from "./admin/tools/lookup";
import type { IWarehouseSlice } from "./inventory/warehouse";
import type { IUOMSlice } from "./inventory/uom";
import type { IItemSlice } from "./inventory/item";


export type RootState = 
    IMenuSlice
    & ILookupSlice
    & IDepartmentSlice
    & IEmployeeSlice
    & IPositionSlice
    & IWarehouseSlice
    & IUOMSlice
    & IItemSlice;


const useStore = create<RootState>()(
    devtools((...data) => ({
        ...createMenuSlice(...data),
        ...createLookupSlice(...data),
        ...createDepartmentSlice(...data),
        ...createEmployeeSlice(...data),
        ...createPositionSlice(...data),
        ...createWarehouseSlice(...data),
        ...createUOMSlice(...data),
        ...createItemSlice(...data),
    }))
);

export default useStore;