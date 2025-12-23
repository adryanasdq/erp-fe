import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createMenuSlice from "./admin/tools/menu";
import createLookupSlice from "./admin/tools/lookup";
import createEmployeeSlice from "./hr/employee";
import createPositionSlice from "./hr/position";
import createDepartmentSlice from "./hr/department";
import createWarehouseSlice from "./inventory/warehouse";

import type { IMenuSlice } from "./admin/tools/menu";
import type { IDepartmentSlice } from "./hr/department";
import type { IEmployeeSlice } from "./hr/employee";
import type { IPositionSlice } from "./hr/position";
import type { ILookupSlice } from "./admin/tools/lookup";
import type { IWarehouseSlice } from "./inventory/warehouse";


export type RootState = 
    IMenuSlice
    & ILookupSlice
    & IDepartmentSlice
    & IEmployeeSlice
    & IPositionSlice
    & IWarehouseSlice;


const useStore = create<RootState>()(
    devtools((...data) => ({
        ...createMenuSlice(...data),
        ...createLookupSlice(...data),
        ...createDepartmentSlice(...data),
        ...createEmployeeSlice(...data),
        ...createPositionSlice(...data),
        ...createWarehouseSlice(...data),
    }))
);

export default useStore;