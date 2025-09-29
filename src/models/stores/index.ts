import { create } from "zustand";
import { devtools } from "zustand/middleware";

import createEmployeeSlice from "./hr/employee";
import type { IEmployeeSlice } from "./hr/employee";

export type StoreState = IEmployeeSlice;


const useStore = create<StoreState>()(
    devtools((...data) => ({
        ...createEmployeeSlice(...data),
    }))
);

export default useStore;