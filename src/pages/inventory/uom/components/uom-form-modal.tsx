import { useEffect, useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";

import useStore from "@/models/stores";
import { DefaultUOM } from "@/models/schema/inventory/uom";
import { IUOM } from "@/models/types/inventory/uom";

interface IUOMFormModalProps {
    mode: string;
    selectedUOM?: IUOM;
}


const UOMFormModal: React.FC<IUOMFormModalProps> = ({
    mode,
    selectedUOM
}) => {
    const isSubmitting = useStore((state) => state.isUOMLoading);
    const uomTypesOptions = useStore((state) => state.lookupItems)
    const createUOM = useStore((state) => state.createUOM);
    const updateUOM = useStore((state) => state.updateUOM);
    const fetchUOMs = useStore((state) => state.fetchUOMs);
    const fetchUOMTypes = useStore((state) => state.fetchLookupItemsByGroupCode)
    const [formData, setFormData] = useState(DefaultUOM);

    useEffect(() => {
        if (mode === "edit" && selectedUOM) {
            setFormData(selectedUOM);
        } else {
            setFormData(DefaultUOM);
        }
    }, [mode, selectedUOM]);

    useEffect(() => {
        fetchUOMTypes("UOM_TYPE");
    }, [fetchUOMTypes])

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
                const response = await createUOM(formData);
            } else {
                if (formData.id) {
                    const response = await updateUOM(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchUOMs();
        setFormData(DefaultUOM);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('uom-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create UOM Data";
        if (mode === "edit") return "Edit UOM Data";

        return "UOM Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="uom-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Name"
                    name="name"
                    value={formData.name}
                    required={true}
                    placeholder="Input UOM name"
                    onChange={handleChange}
                />
                <InputField
                    className="w-full"
                    legend="Symbol"
                    label="ex. pcs, kg, m"
                    name="symbol"
                    value={formData.symbol}
                    required={true}
                    placeholder="Input UOM symbol"
                    onChange={handleChange}
                />

                <SelectOption
                    legend="Type"
                    name="type"
                    value={formData.type}
                    required={true}
                    options={uomTypesOptions}
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

export default UOMFormModal;