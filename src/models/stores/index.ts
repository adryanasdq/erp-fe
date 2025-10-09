import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createEmployeeSlice from "./hr/employee";
import createPositionSlice from "./hr/position";

import type { IEmployeeSlice } from "./hr/employee";
import type { IPositionSlice } from "./hr/position";

export type StoreState = IEmployeeSlice & IPositionSlice;


const useStore = create<StoreState>()(
    devtools((...data) => ({
        ...createEmployeeSlice(...data),
        ...createPositionSlice(...data),
    }))
);

export default useStore;