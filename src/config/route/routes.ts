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
        path: '/inventory',
        element: lazy(() => import('@/pages/inventory/index')),
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
        path: '/inventory/uom-conversion',
        element: lazy(() => import('@/pages/inventory/item-uom-conversion')),
        layout: 'sidebar'
    },
    {
        path: '/inventory/stock-movement',
        element: lazy(() => import('@/pages/inventory/stock-movement')),
        layout: 'sidebar'
    },
    {
        path: '/purchasing',
        element: lazy(() => import('@/pages/purchasing/index')),
        layout: 'sidebar'
    },
    {
        path: '/purchasing/supplier',
        element: lazy(() => import('@/pages/purchasing/supplier/index')),
        layout: 'sidebar'
    },
    {
        path: '/purchasing/purchase-order',
        element: lazy(() => import('@/pages/purchasing/purchase-order/index')),
        layout: 'sidebar'
    },
    {
        path: '/purchasing/good-receipt',
        element: lazy(() => import('@/pages/purchasing/good-receipt/index')),
        layout: 'sidebar'
    },
    {
        path: '/sales',
        element: lazy(() => import('@/pages/sales/index')),
        layout: 'sidebar'
    },
    {
        path: '/sales/customer',
        element: lazy(() => import('@/pages/sales/customer/index')),
        layout: 'sidebar'
    },
    {
        path: '/sales/delivery',
        element: lazy(() => import('@/pages/sales/delivery/index')),
        layout: 'sidebar'
    },
    {
        path: '/sales/sales-order',
        element: lazy(() => import('@/pages/sales/sales-order/index')),
        layout: 'sidebar'
    },
    {
        path: '/accounting',
        element: lazy(() => import('@/pages/accounting/index')),
        layout: 'sidebar'
    },
    {
        path: '/accounting/account',
        element: lazy(() => import('@/pages/accounting/account/index')),
        layout: 'sidebar'
    },
    {
        path: '/accounting/journal',
        element: lazy(() => import('@/pages/accounting/journal/index')),
        layout: 'sidebar'
    },
    {
        path: '*',
        element: lazy(() => import('@/pages/error/404')),
        layout: 'sidebar'
    }
]