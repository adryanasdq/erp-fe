import { lazy } from "react";


export const routes = [
    {
        path: '/',
        element: lazy(() => import('@/pages/index')),
        layout: 'navbar'
    },
    {
        path: '/hr',
        element: lazy(() => import('@/pages/hr/employee/index')),
        layout: 'sidebar'
    }
]