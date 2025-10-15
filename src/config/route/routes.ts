import { lazy } from "react";


export const routes = [
    {
        path: '/',
        element: lazy(() => import('@/pages/index')),
        layout: 'navbar'
    },
    {
        path: '/hr',
        element: lazy(() => import('@/pages/hr/index')),
        layout: 'sidebar'
    },
    {
        path: '/hr/employee',
        element: lazy(() => import('@/pages/hr/employee/index')),
        layout: 'sidebar'
    },
    {
        path: '*',
        element: lazy(() => import('@/pages/error/404')),
        layout: 'blank'
    }
]