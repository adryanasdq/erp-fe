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
        path: '/human-resource',
        element: lazy(() => import('@/pages/human-resource/index')),
        layout: 'sidebar'
    },
    {
        path: '/human-resource/department',
        element: lazy(() => import('@/pages/human-resource/department/index')),
        layout: 'sidebar'
    },
    {
        path: '/human-resource/employee',
        element: lazy(() => import('@/pages/human-resource/employee/index')),
        layout: 'sidebar'
    },
    {
        path: '/human-resource/position',
        element: lazy(() => import('@/pages/human-resource/position/index')),
        layout: 'sidebar'
    },
    {
        path: '/inventory/warehouse',
        element: lazy(() => import('@/pages/inventory/warehouse/index')),
        layout: 'sidebar'
    },
    {
        path: '/inventory/uom',
        element: lazy(() => import('@/pages/inventory/uom/index')),
        layout: 'sidebar'
    },
    {
        path: '/inventory/item',
        element: lazy(() => import('@/pages/inventory/item/index')),
        layout: 'sidebar'
    },
    {
        path: '/inventory/stock-balance',
        element: lazy(() => import('@/pages/inventory/stock-balance')),
        layout: 'sidebar'
    },
    {
        path: '*',
        element: lazy(() => import('@/pages/error/404')),
        layout: 'sidebar'
    }
]