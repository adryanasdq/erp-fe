import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores";
import { ISupplier } from "@/models/types/purchasing/supplier";

import SupplierTable from "./components/supplier-table";
import SupplierFormModal from "./components/supplier-form-modal";


const SupplierPage = () => {
    const suppliers = useStore((state) => state.suppliers);
    const fetchSuppliers = useStore((state) => state.fetchSuppliers);
    const fetchVendorStatusOptions = useStore((state) => state.fetchLookupItemsByGroupCode);
    const deleteSupplier = useStore((state) => state.deleteSupplier);   

    const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredSupplier = useMemo(() => {
        return suppliers.filter((pos) => {
            return pos.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [suppliers, searchText])

    useEffect(() => {
        fetchVendorStatusOptions("VENDOR_STATUS");
    }, [fetchVendorStatusOptions]);

    useEffect(() => {
        fetchSuppliers();
    }, [fetchSuppliers]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (supplierId: string) => {
        const supplier = suppliers.find((e) => e.id === supplierId) || null;

        setSelectedSupplier(supplier);
        setFormDialogMode("edit");
        (document.getElementById("supplier-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (supplierId: string) => {
        if (confirm("Are you sure want to delete this supplier?")) {
            deleteSupplier(supplierId);
        }

        await fetchSuppliers();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("supplier-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <SupplierFormModal
                mode={formDialogMode}
                selectedSupplier={selectedSupplier}
            />

            <div className="text-4xl mt-4 mb-8">Supplier</div>

            <SupplierTable
                data={filteredSupplier}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default SupplierPage;