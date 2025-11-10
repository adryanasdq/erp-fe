import { lazy } from "react";


export const routes = [
    {
        path: '/',
        element: lazy(() => import('@/pages/index')),
        layout: 'navbar'
    },
    {
        path: '/admin',
        element: lazy(() => import('@/pages/admin/index')),
        layout: 'sidebar'
    },
    {
        path: '/admin/tools/menu-mgmt',
        element: lazy(() => import('@/pages/admin/tools/menu-mgmt/index')),
        layout: 'sidebar'
    },
    {
        path: '/admin/tools/lookup',
        element: lazy(() => import('@/pages/admin/tools/lookup/index')),
        layout: 'sidebar'
    },
    {
        path: '/hr',
        element: lazy(() => import('@/pages/hr/index')),
        layout: 'sidebar'
    },
    {
        path: '/hr/department',
        element: lazy(() => import('@/pages/hr/department/index')),
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