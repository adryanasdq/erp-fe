import type { MenuItem } from "../../models/types/admin/tools/menu";

export const menuItems: MenuItem[] = [
    // Human Resource Section
    { id: 1, parentId: null, title: "Human Resource", url: null, open: true },
    { id: 2, parentId: 1, title: "Employee", url: "/hr/employee" },
    { id: 3, parentId: 1, title: "Position", url: "/hr/position" },
    { id: 4, parentId: 1, title: "Department", url: "/hr/department" },
    { id: 5, parentId: 1, title: "Payroll", url: "/hr/payroll" },
    { id: 6, parentId: 1, title: "Attendance", url: "/hr/attendance" },
    { id: 7, parentId: 1, title: "Leave Management", url: "/hr/leave" },
    { id: 8, parentId: 1, title: "Recruitment", url: "/hr/recruitment" },

    // Inventory Section
    { id: 9, parentId: null, title: "Inventory", url: null, open: false },
    { id: 10, parentId: 9, title: "Products", url: "/inventory/products" },
    { id: 11, parentId: 9, title: "Categories", url: "/inventory/categories" },
    { id: 12, parentId: 9, title: "Suppliers", url: "/inventory/suppliers" },
    { id: 13, parentId: 9, title: "Stock Management", url: "/inventory/stock" },

    // Finance Section
    { id: 14, parentId: null, title: "Finance", url: null, open: false },
    { id: 15, parentId: 14, title: "Invoices", url: "/finance/invoices" },
    { id: 16, parentId: 14, title: "Expenses", url: "/finance/expenses" },
    { id: 17, parentId: 14, title: "Budgets", url: "/finance/budgets" },
    { id: 18, parentId: 14, title: "Reports", url: "/finance/reports" },

    // Sales & CRM Section
    { id: 19, parentId: null, title: "Sales & CRM", url: null, open: false },
    { id: 20, parentId: 19, title: "Leads", url: "/sales/leads" },
    { id: 21, parentId: 19, title: "Opportunities", url: "/sales/opportunities" },
    { id: 22, parentId: 19, title: "Customers", url: "/sales/customers" },
    { id: 23, parentId: 19, title: "Sales Orders", url: "/sales/orders" },

    // Projects Section
    { id: 24, parentId: null, title: "Projects", url: null, open: false },
    { id: 25, parentId: 24, title: "Project List", url: "/projects/list" },
    { id: 26, parentId: 24, title: "Tasks", url: "/projects/tasks" },
    { id: 27, parentId: 24, title: "Time Tracking", url: "/projects/time-tracking" },

    // Settings Section
    { id: 28, parentId: null, title: "Settings", url: null, open: false },
    { id: 29, parentId: 28, title: "Company Settings", url: "/settings/company" },
    { id: 30, parentId: 28, title: "User Management", url: "/settings/users" },
    { id: 31, parentId: 28, title: "Roles & Permissions", url: "/settings/roles" },
    { id: 32, parentId: 28, title: "Integrations", url: "/settings/integrations" },

    // Purchasing Section
    { id: 33, parentId: null, title: "Purchasing", url: null, open: false },
    { id: 34, parentId: 33, title: "Purchase Orders", url: "/purchasing/orders" },
    { id: 35, parentId: 33, title: "Vendors", url: "/purchasing/vendors" },
    { id: 36, parentId: 33, title: "Quotes", url: "/purchasing/quotes" },
    { id: 37, parentId: 33, title: "Receipts", url: "/purchasing/receipts" },
];
