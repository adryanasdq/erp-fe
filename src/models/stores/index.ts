import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createMenuSlice from "./admin/tools/menu";
import createEmployeeSlice from "./hr/employee";
import createPositionSlice from "./hr/position";

import type { IMenuSlice } from "./admin/tools/menu";
import type { IEmployeeSlice } from "./hr/employee";
import type { IPositionSlice } from "./hr/position";

export type RootState = 
    IMenuSlice
    & IEmployeeSlice
    & IPositionSlice;


const useStore = create<RootState>()(
    devtools((...data) => ({
        ...createMenuSlice(...data),
        ...createEmployeeSlice(...data),
        ...createPositionSlice(...data),
    }))
);

export default useStore;