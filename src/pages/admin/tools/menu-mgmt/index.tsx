import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores/index";

import MenuTable from "./components/menu-table";
import MenuFormModal from "./components/menu-form-modal";

const MenuManagementPage = () => {
    const data = useStore((state) => state.menus);
    const fetchData = useStore((state) => state.fetchMenus);
    const deleteMenuItem = useStore((state) => state.deleteMenu);

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredMenu = useMemo(() => {
        return data.filter((menu) => {
            return menu.title.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [data, searchText])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (menuId: string) => {
        const menu = data.find((m) => m.id === menuId) || null;

        setSelectedMenu(menu);
        setFormDialogMode("edit");
        (document.getElementById("menu-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (menuId: string) => {
        if (confirm("Are you sure want to delete this menu item?")) {
            deleteMenuItem(menuId);
        }

        await fetchData();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("menu-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <MenuFormModal
                mode={formDialogMode}
                selectedMenu={selectedMenu}
            />

            <MenuTable
                data={filteredMenu}
                searchText={searchText}
                handleSearch={handleSearch}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </>
    );
};

export default MenuManagementPage;