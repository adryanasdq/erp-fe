import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";

import useStore from "@/models/stores/index";
import type { IMenuItem } from "@/models/types/admin/tools/menu";


const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const menus = useStore((state) => state.menus);
    const fetchMenus = useStore((state) => state.fetchMenus);

    useEffect(() => {
        fetchMenus();
    }, [fetchMenus]);

    const groupedMenuItems = useMemo<IMenuItem[]>(() => {
        const map: Record<number, IMenuItem> = {};
        const tree: IMenuItem[] = [];

        menus.forEach((item) => {
            map[item.id] = { ...item, children: [] };
        });

        menus.forEach((item) => {
            const currentItem = map[item.id];
            if (item.parent_id != null) {
                const parentItem = map[item.parent_id];
                if (parentItem) {
                    parentItem.children!.push(currentItem);
                }
            } else {
                tree.push(currentItem);
            }
        });

        return tree;
    }, [menus]);

    const renderMenuItems = (items: IMenuItem[]) => {
        return items.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            return (
                <li key={item.id}>
                    {hasChildren ? (
                        <details>
                            <summary>{item.title}</summary>
                            <ul>
                                {renderMenuItems(item.children!)}
                            </ul>
                        </details>
                    ) : (
                        <a href={item.url || "#"}>{item.title}</a>
                    )}
                </li>
            );
        });
    };

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
                    <ul className="menu bg-base-200 rounded-box w-56">
                        <ul className="menu bg-base-200 rounded-box w-56">
                            {renderMenuItems(groupedMenuItems)}
                        </ul>
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