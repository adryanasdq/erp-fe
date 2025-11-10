import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Building2, PanelLeft } from "lucide-react";

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
            if (item.is_hidden) return;

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

        tree.forEach((node) => {
            const sortChildren = (item: IMenuItem) => {
                if (item.children && item.children.length > 0) {
                    item.children.sort((a, b) => a.order_index - b.order_index);
                    item.children.forEach(sortChildren);
                }
            };

            sortChildren(node);
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

    const renderBreadcrumbs = () => {
        const location = useLocation();
        const pathnames = location.pathname.split("/").filter((x) => x);

        return (
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href="/">Home</a></li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;

                        return isLast ? (
                            <li key={to}>{value}</li>
                        ) : (
                            <li key={to}>
                                <a href={to}>{value}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
            <div className="flex flex-1 overflow-hidden">
                <aside
                    className={`bg-white shadow-lg transition-all duration-300 ease-in-out 
                        ${sidebarOpen ? "w-60" : "w-0"} overflow-y-auto`}
                >
                    <div className="flex items-center gap-3 p-4">
                        <Building2 size={48} />
                        <div>
                            <h2 className="text-xl font-bold">ERP</h2>
                            <p className="text-sm">Enterprise</p>
                        </div>
                    </div>

                    <ul className="menu rounded-box w-56">
                        <ul className="menu rounded-box w-56">
                            {renderMenuItems(groupedMenuItems)}
                        </ul>
                    </ul>

                    <div className="absolute bottom-0 w-full p-4 border-t border-base-300">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">A</span>
                            </div>
                            <div>
                                <p className="font-medium">Adryan Ashidiq</p>
                                <a href="#" className="text-sm text-blue-600 hover:underline">View Profile</a>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 p-4 overflow-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <PanelLeft className="cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
                        <span>|</span>
                        {renderBreadcrumbs()}
                    </div>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default SideBar;