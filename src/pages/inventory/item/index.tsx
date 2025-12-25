import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores"
import { IItem } from "@/models/types/inventory/item";

import ItemFormModal from "./components/item-form-modal";
import ItemTable from "./components/item-table";


const ItemPage = () => {
    const items = useStore((state) => state.items);
    const fetchItems = useStore((state) => state.fetchItems);
    const deleteItem = useStore((state) => state.deleteItem);
    const fetchItemCategory = useStore((state) => state.fetchLookupItemsByGroupCode);
    const fetchUOMs = useStore((state) => state.fetchUOMs);

    const [selectedItem, setSelectedItem] = useState<IItem | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredItem = useMemo(() => {
        return items.filter((item) => {
            return item.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [items, searchText])

    useEffect(() => {
        fetchItems();
    }, [fetchItems])

    useEffect(() => {
        fetchItemCategory("ITEM_CATEGORY");
    }, [fetchItemCategory])

    useEffect(() => {
        fetchUOMs();
    }, [fetchUOMs])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (itemId: string) => {
        const item = items.find((e) => e.id === itemId) || null;

        setSelectedItem(item);
        setFormDialogMode("edit");
        (document.getElementById("item-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (itemId: string) => {
        if (confirm("Are you sure want to delete this item?")) {
            deleteItem(itemId);
        }

        await fetchItems();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("item-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <ItemFormModal
                mode={formDialogMode}
                selectedItem={selectedItem}
            />

            <div className="text-4xl mt-4 mb-8">Item</div>

            <ItemTable
                data={filteredItem}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default ItemPage;