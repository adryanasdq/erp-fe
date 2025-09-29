import { useMemo, useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";

import { menuItems } from "../api/mock/_menu";
import type { MenuItem } from "../models/types/admin/tools/menu";

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const groupedMenuItems = useMemo(() => {
        const map = new Map<number, MenuItem>();

        menuItems.forEach(item => {
            map.set(item.id, { ...item, children: [] });
        });

        return menuItems.reduce<MenuItem[]>((roots, item) => {
            const current = map.get(item.id)!;
            if (item.parentId == null) {
                roots.push(current);
            } else {
                const parent = map.get(item.parentId);
                if (parent) {
                    parent.children?.push(current);
                }
            }
            return roots;
        }, []);
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <header className="flex items-center justify-between bg-white shadow px-4 py-2 sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-xl">ERP</span>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-full px-4 py-1 w-64 focus:outline-none focus:ring"
                    />
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside
                    className={`bg-white shadow-lg transition-all duration-300 ease-in-out 
          ${sidebarOpen ? "w-60" : "w-0"} overflow-y-auto`}
                >
                    <ul className="menu rounded-box w-full p-4">
                        {groupedMenuItems.map((item) => (
                            <li key={item.id}>
                                {item.children && item.children.length > 0 ? (
                                    <details open={item.open}>
                                        <summary>{item.title}</summary>
                                        <ul>
                                            {item.children.map((child) => (
                                                <li key={child.id}>
                                                    <a href={child.url || "#"}>{child.title}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                ) : (
                                    <a href={item.url || "#"}>{item.title}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="flex-1 p-4 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default SideBar;