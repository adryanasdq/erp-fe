import { useState, useEffect, useMemo } from "react";

import useStore from "@/models/stores";

import LookupGroupTable from "./components/lookup-group-table";
import LookupItemTable from "./components/lookup-item-table";
import LookupFormModal from "./components/lookup-form-modal";


const Lookup = () => {
    const groups = useStore((state) => state.lookupGroups);
    const options = useStore((state) => state.lookupItems);
    const fetchLookupGroups = useStore((state) => state.fetchLookupGroups);
    const fetchLookupItems = useStore((state) => state.fetchLookupItems);
    const fetchLookupItemsByGroupCode = useStore((state) => state.fetchLookupItemsByGroupCode);
    const deleteLookupItem = useStore((state) => state.deleteLookupItem);

    const [selectedOption, setSelectedOption] = useState(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchLookupGroups();
    }, [fetchLookupGroups]);

    useEffect(() => {
        fetchLookupItems();
    }, [fetchLookupItems]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (lookupId: string) => {
        const lookup = options.find((o) => o.id === lookupId) || null;

        setSelectedOption(lookup);
        setFormDialogMode("edit");
        (document.getElementById("lookup-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (lookupId: string) => {
        if (confirm("Are you sure want to delete this lookup item?")) {
            await deleteLookupItem(lookupId);
        }

        await fetchLookupItems();
    }

    const handleGroupCodeClick = (groupCode: string) => {
        fetchLookupItemsByGroupCode(groupCode);
    }

    const filteredOptions = useMemo(() => {
        const sorted = options.sort((a, b) =>
            a.group_code.localeCompare(b.group_code)
            || a.order_index - b.order_index
        );

        return sorted.filter((item) =>
            item.label.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [options, searchText]);

    const openModal = () => {
        (document.getElementById("lookup-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <div className="text-4xl mt-4 mb-8">Lookup</div>

            <div className="flex flex-col gap-20">
                <LookupGroupTable data={groups} handleGroupClick={handleGroupCodeClick} />

                <LookupItemTable
                    data={filteredOptions}
                    searchText={searchText}
                    handleSearch={handleSearch}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    openModal={openModal}
                />
            </div>

            <LookupFormModal
                mode={formDialogMode}
                selectedLookup={selectedOption}
            />
        </>
    )
};

export default Lookup;