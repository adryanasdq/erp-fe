import { useEffect, useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";

import useStore from "@/models/stores";
import { DefaultSupplier } from "@/models/schema/purchasing/supplier";
import { ISupplier } from "@/models/types/purchasing/supplier";

interface ISupplierFormModalProps {
    mode: string;
    selectedSupplier?: ISupplier;
}


const SupplierFormModal: React.FC<ISupplierFormModalProps> = ({
    mode,
    selectedSupplier
}) => {
    const isSubmitting = useStore((state) => state.isSupplierLoading);
    const createSupplier = useStore((state) => state.createSupplier);
    const updateSupplier = useStore((state) => state.updateSupplier);
    const fetchSuppliers = useStore((state) => state.fetchSuppliers);
    const vendorStatus = useStore((state) => state.lookupItems);
    const [formData, setFormData] = useState(DefaultSupplier);

    const vendorStatusOptions = vendorStatus.map((type) => ({
        value: type.value,
        label: type.label,
    }));

    useEffect(() => {
        if (mode === "edit" && selectedSupplier) {
            setFormData(selectedSupplier);
        } else {
            setFormData(DefaultSupplier);
        }
    }, [mode, selectedSupplier]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === "new") {
                const response = await createSupplier(formData);
            } else {
                if (formData.id) {
                    const response = await updateSupplier(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchSuppliers();
        setFormData(DefaultSupplier);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('supplier-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create Supplier Data";
        if (mode === "edit") return "Edit Supplier Data";

        return "Supplier Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    /*
    id: '',
    code: '',
    name: '',
    status: 'ACTIVE',
    modified_date: new Date(),
    */

    return (
        <Modal id="supplier-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Name"
                    name="name"
                    value={formData.name}
                    required={true}
                    placeholder="Input supplier name"
                    onChange={handleChange}
                />
                <InputField
                    className="w-full"
                    legend="Code"
                    name="code"
                    value={formData.code}
                    required={true}
                    placeholder="Input supplier code"
                    onChange={handleChange}
                />

                <SelectOption
                    legend="Status"
                    name="status"
                    value={formData.status}
                    required={true}
                    options={vendorStatusOptions}
                    onChange={handleChange}
                />

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-ghost mt-2 mr-2"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn mt-2"
                    >
                        {getButtonLabel()}
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default SupplierFormModal;