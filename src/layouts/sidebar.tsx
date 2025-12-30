import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { FileText, PanelLeft } from "lucide-react";

import useStore from "@/models/stores/index";
import type { IMenuItem } from "@/models/types/admin/tools/menu";


const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

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

        const currentMenu = tree.filter((menu) => menu.url === `/${pathnames[0]}`);
        return currentMenu[0]?.children;
    }, [menus]);

    const renderMenuItems = (items: IMenuItem[]) => {
        return items?.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            return (
                <li key={item.id}>
                    {hasChildren ? (
                        <>
                            <details open={true} className="is-drawer-close:hidden">
                                <summary>{item.title}</summary>
                                <ul>
                                    {renderMenuItems(item.children!)}
                                </ul>
                            </details>

                            <div className="is-drawer-open:hidden flex flex-col items-center gap-4">
                                {item.children!.map((child) => (
                                    <div
                                        key={child.id}
                                        className="tooltip tooltip-right"
                                        data-tip={child.title}
                                        onClick={() => navigate(child.url)}
                                    >
                                        <img src={child.icon} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div
                            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                            data-tip={item.title}
                            onClick={() => navigate(item.url)}
                        >
                            <img src={item.icon} />
                            <span className="is-drawer-close:hidden">{item.title}</span>
                        </div>
                    )}
                </li>

            )
        });
    };

    const renderBreadcrumbs = () => {
        return (
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href="/" className="hover:!text-yellow-300">Home</a></li>
                    {pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const pascalTitle = value.split("-")
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ");

                        return isLast ? (
                            <li key={to}>{pascalTitle}</li>
                        ) : (
                            <li key={to}>
                                <a href={to} className="hover:!text-yellow-300">{pascalTitle}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-blue-500 text-white shadow-md sticky top-0 z-5">
                    <label htmlFor="drawer-toggle" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <PanelLeft />
                    </label>
                    <span className="px-4">|</span>
                    {renderBreadcrumbs()}
                </nav>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible shadow-md">
                <label htmlFor="drawer-toggle" className="drawer-overlay" />
                <div className="flex min-h-full flex-col items-start gap-12 bg-base-200 is-drawer-close:w-20 is-drawer-open:w-60">
                    <div className="flex items-center w-full gap-4 px-4 pt-4">
                        <div className="rounded-xl p-3 bg-blue-500">
                            <FileText size={24} className="text-white" />
                        </div>
                        <div className="is-drawer-close:hidden">
                            <h2 className="text-xl font-bold">ERP</h2>
                            <p className="text-sm">Enterprise</p>
                        </div>
                    </div>

                    <ul className="menu w-full grow flex flex-col gap-2 px-4 py-0">
                        {renderMenuItems(groupedMenuItems)}
                    </ul>

                    <div className="absolute bottom-0 w-full p-4 border-t border-base-300">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-600 font-semibold">A</span>
                            </div>
                            <div className="is-drawer-close:hidden">
                                <p className="font-medium">Adryan Ashidiq</p>
                                <a href="#" className="text-sm text-blue-600 hover:underline">View Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar;