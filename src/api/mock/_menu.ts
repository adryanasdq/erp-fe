import type { IMenuItem } from "../../models/types/admin/tools/menu";

export const menuItems: IMenuItem[] = [
    // Human Resource Section
    { id: "1", parent_id: null, title: "Human Resource", url: null, is_hidden: true },
    { id: "2", parent_id: "1", title: "Employee", url: "/hr/employee" },
    { id: "3", parent_id: "1", title: "Position", url: "/hr/position" },
    { id: "4", parent_id: "1", title: "Department", url: "/hr/department" },
    { id: "5", parent_id: "1", title: "Payroll", url: "/hr/payroll" },
    { id: "6", parent_id: "1", title: "Attendance", url: "/hr/attendance" },
    { id: "7", parent_id: "1", title: "Leave Management", url: "/hr/leave" },
    { id: "8", parent_id: "1", title: "Recruitment", url: "/hr/recruitment" },

    // Inventory Section
    { id: "9", parent_id: null, title: "Inventory", url: null, is_hidden: false },
    { id: "10", parent_id: "9", title: "Products", url: "/inventory/products" },
    { id: "11", parent_id: "9", title: "Categories", url: "/inventory/categories" },
    { id: "12", parent_id: "9", title: "Suppliers", url: "/inventory/suppliers" },
    { id: "13", parent_id: "9", title: "Stock Management", url: "/inventory/stock" },

    // Finance Section
    { id: "14", parent_id: null, title: "Finance", url: null, is_hidden: false },
    { id: "15", parent_id: "14", title: "Invoices", url: "/finance/invoices" },
    { id: "16", parent_id: "14", title: "Expenses", url: "/finance/expenses" },
    { id: "17", parent_id: "14", title: "Budgets", url: "/finance/budgets" },
    { id: "18", parent_id: "14", title: "Reports", url: "/finance/reports" },

    // Sales & CRM Section
    { id: "19", parent_id: null, title: "Sales & CRM", url: null, is_hidden: false },
    { id: "20", parent_id: "19", title: "Leads", url: "/sales/leads" },
    { id: "21", parent_id: "19", title: "Opportunities", url: "/sales/opportunities" },
    { id: "22", parent_id: "19", title: "Customers", url: "/sales/customers" },
    { id: "23", parent_id: "19", title: "Sales Orders", url: "/sales/orders" },

    // Projects Section
    { id: "24", parent_id: null, title: "Projects", url: null, is_hidden: false },
    { id: "25", parent_id: "24", title: "Project List", url: "/projects/list" },
    { id: "26", parent_id: "24", title: "Tasks", url: "/projects/tasks" },
    { id: "27", parent_id: "24", title: "Time Tracking", url: "/projects/time-tracking" },

    // Settings Section
    { id: "28", parent_id: null, title: "Settings", url: null, is_hidden: false },
    { id: "29", parent_id: "28", title: "Company Settings", url: "/settings/company" },
    { id: "30", parent_id: "28", title: "User Management", url: "/settings/users" },
    { id: "31", parent_id: "28", title: "Roles & Permissions", url: "/settings/roles" },
    { id: "32", parent_id: "28", title: "Integrations", url: "/settings/integrations" },

    // Purchasing Section
    { id: "33", parent_id: null, title: "Purchasing", url: null, is_hidden: false },
    { id: "34", parent_id: "33", title: "Purchase Orders", url: "/purchasing/orders" },
    { id: "35", parent_id: "33", title: "Vendors", url: "/purchasing/vendors" },
    { id: "36", parent_id: "33", title: "Quotes", url: "/purchasing/quotes" },
    { id: "37", parent_id: "33", title: "Receipts", url: "/purchasing/receipts" },
];
