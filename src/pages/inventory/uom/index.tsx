import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores"
import { IUOM } from "@/models/types/inventory/uom";

import UOMTable from "./components/uom-table";
import UOMFormModal from "./components/uom-form-modal";


const UOMPage = () => {
    const uoms = useStore((state) => state.uoms);
    const fetchUOMs = useStore((state) => state.fetchUOMs);
    const deleteUOM = useStore((state) => state.deleteUOM);
    const fetchUOMTypes = useStore((state) => state.fetchLookupItemsByGroupCode);

    const [selectedUOM, setSelectedUOM] = useState<IUOM | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredUOM = useMemo(() => {
        return uoms.filter((uom) => {
            return uom.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [uoms, searchText])

    useEffect(() => {
        fetchUOMs();
    }, [fetchUOMs])

    useEffect(() => {
        fetchUOMTypes("UOM_TYPE");
    }, [fetchUOMTypes])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (uomId: string) => {
        const uom = uoms.find((e) => e.id === uomId) || null;

        setSelectedUOM(uom);
        setFormDialogMode("edit");
        (document.getElementById("uom-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (uomId: string) => {
        if (confirm("Are you sure want to delete this uom?")) {
            deleteUOM(uomId);
        }

        await fetchUOMs();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("uom-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <UOMFormModal
                mode={formDialogMode}
                selectedUOM={selectedUOM}
            />

            <div className="text-4xl mt-4 mb-8">Unit of Measure</div>

            <UOMTable
                data={filteredUOM}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default UOMPage;