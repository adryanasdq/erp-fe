import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores"

import UOMConversionTable from "./components/uom-conversion-table";
import UOMConversionFormModal from "./components/uom-conversion-form-modal";
import { IChangeStatusConversion } from "@/models/types/inventory/item-uom-conversion";


const UOMConversionPage = () => {
    const uomConversions = useStore((state) => state.uomConversions);
    const fetchUOMConversions = useStore((state) => state.fetchUOMConversions);
    const changeStatusConversion = useStore((state) => state.changeStatusConversion);
    const fetchItems = useStore((state) => state.fetchItems);
    const fetchUOMs = useStore((state) => state.fetchUOMs);
    const [searchText, setSearchText] = useState("");

    const filteredUOMConversion = useMemo(() => {
        return uomConversions.filter((uom) => {
            return uom.item_id.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [uomConversions, searchText])

    useEffect(() => {
        fetchUOMConversions();
    }, [fetchUOMConversions])

    useEffect(() => {
        fetchItems();
    }, [fetchItems])

    useEffect(() => {
        fetchUOMs();
    }, [fetchUOMs])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleDelete = async (convId: string) => {
        if (confirm("Are you sure want to delete this uom conversion?")) {
            const payload: IChangeStatusConversion = {
                id: convId,
                is_active: false,
            }

            await changeStatusConversion(payload);
        }

        await fetchUOMConversions();
    }

    const openModal = () => {
        (document.getElementById("uom-conversion-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <UOMConversionFormModal />

            <div className="text-4xl mt-4 mb-8">UOM Conversion</div>

            <UOMConversionTable
                data={filteredUOMConversion}
                openModal={openModal}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default UOMConversionPage;