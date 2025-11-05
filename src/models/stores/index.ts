import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createMenuSlice from "./admin/tools/menu";
import createLookupSlice from "./admin/tools/lookup";
import createEmployeeSlice from "./hr/employee";
import createPositionSlice from "./hr/position";

import type { IMenuSlice } from "./admin/tools/menu";
import type { IEmployeeSlice } from "./hr/employee";
import type { IPositionSlice } from "./hr/position";
import type { ILookupSlice } from "./admin/tools/lookup";


export type RootState = 
    IMenuSlice
    & ILookupSlice
    & IEmployeeSlice
    & IPositionSlice;


const useStore = create<RootState>()(
    devtools((...data) => ({
        ...createMenuSlice(...data),
        ...createLookupSlice(...data),
        ...createEmployeeSlice(...data),
        ...createPositionSlice(...data),
    }))
);

export default useStore;