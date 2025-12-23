import { useEffect, useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";
import TextAreaField from "@/components/data-input/text-area";

import useStore from "@/models/stores";
import { DefaultWarehouse } from "@/models/schema/inventory/warehouse";
import { IWarehouse } from "@/models/types/inventory/warehouse";

interface IWarehouseFormModalProps {
    mode: string;
    selectedWarehouse?: IWarehouse;
}


const WarehouseFormModal: React.FC<IWarehouseFormModalProps> = ({
    mode,
    selectedWarehouse
}) => {
    const isSubmitting = useStore((state) => state.isLoading);
    const createWarehouse = useStore((state) => state.createWarehouse);
    const updateWarehouse = useStore((state) => state.updateWarehouse);
    const fetchWarehouses = useStore((state) => state.fetchWarehouses);
    const [formData, setFormData] = useState(DefaultWarehouse);

    useEffect(() => {
        if (mode === "edit" && selectedWarehouse) {
            setFormData(selectedWarehouse);
        } else {
            setFormData(DefaultWarehouse);
        }
    }, [mode, selectedWarehouse]);

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
                const response = await createWarehouse(formData);
            } else {
                if (formData.id) {
                    const response = await updateWarehouse(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchWarehouses();
        setFormData(DefaultWarehouse);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('warehouse-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create Warehouse Data";
        if (mode === "edit") return "Edit Warehouse Data";

        return "Warehouse Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="warehouse-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Name"
                    name="name"
                    value={formData.name}
                    required={true}
                    placeholder="Input warehouse name"
                    onChange={handleChange}
                />
                <InputField
                    className="w-full"
                    legend="Location"
                    name="location"
                    value={formData.location}
                    required={true}
                    placeholder="Input warehouse location"
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

export default WarehouseFormModal;