import { useState, useEffect, useMemo } from "react";

import useStore from "@/models/stores";

import LookupGroupTable from "./components/lookup-group-table";
import LookupItemTable from "./components/lookup-item-table";


const Lookup = () => {
    const groups = useStore((state) => state.lookupGroups);
    const options = useStore((state) => state.lookupItems);
    const fetchLookupGroups = useStore((state) => state.fetchLookupGroups);
    const fetchLookupItems = useStore((state) => state.fetchLookupItems);

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

    const filteredOptions = useMemo(() => {
        const sorted = options.sort((a, b) => a.group_code.localeCompare(b.group_code) || a.order_index - b.order_index);

        return sorted.filter((item) => item.label.toLowerCase().includes(searchText.toLowerCase()));
    }, [options, searchText]);

    const openModal = () => {
        (document.getElementById("lookup-item-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <div className="text-4xl mt-4 mb-8">Lookup</div>

            <div className="flex flex-col gap-20">
                <LookupGroupTable data={groups} />

                <LookupItemTable
                    data={filteredOptions}
                    searchText={searchText}
                    handleSearch={handleSearch}
                    openModal={openModal}
                />
            </div>
        </>
    )
};

export default Lookup;