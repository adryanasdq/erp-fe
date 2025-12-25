import { useEffect, useState } from "react";

import Modal from "@/components/modal";
import SelectOption from "@/components/data-input/select-option";
import InputField from "@/components/data-input/input-field";
import Checkbox from "@/components/data-input/checkbox";

import useStore from "@/models/stores";
import { ILookupItem } from "@/models/types/admin/tools/lookup";
import { DefaultLookupItem } from "@/models/schema/admin/tools/lookup";


interface ILookupFormModalProps {
    mode: "new" | "edit" | "view";
    selectedLookup?: ILookupItem;
}

const LookupFormModal: React.FC<ILookupFormModalProps> = ({
    mode,
    selectedLookup
}) => {
    const fetchLookupItems = useStore((state) => state.fetchLookupItems);
    const createLookupItem = useStore((state) => state.createLookupItem);
    const updateLookupItem = useStore((state) => state.updateLookupItem);
    const isSubmitting = useStore((state) => state.isLookupLoading);
    const groups = useStore((state) => state.lookupGroups);
    
    const [formData, setFormData] = useState<ILookupItem>(DefaultLookupItem);

    const groupOptions = groups.map((group) => ({
        value: group.group_code,
        label: group.group_code
    }));

    useEffect(() => {
        if (mode === "edit" && selectedLookup) {
            setFormData(selectedLookup);
        } else {
            setFormData(DefaultLookupItem);
        }
    }, [mode, selectedLookup]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            group_desc: groups.find((g) => g.group_code === formData.group_code)?.group_desc || ""
        }));
    }, [formData.group_code]);

    const closeModal = () => {
        (document.getElementById("lookup-form") as HTMLDialogElement).close();
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: checked
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === "new") {
                const response = await createLookupItem(formData);
            } else {
                if (formData.id) {
                    const response = await updateLookupItem(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchLookupItems();
        setFormData(DefaultLookupItem);
        closeModal();
    }

    const getModalTitle = () => {
        if (mode === "new") return "Create Lookup Option";
        if (mode === "edit") return "Edit Lookup Option";

        return "View Lookup Item";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Create";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    useEffect(() => {
        console.log("Form Data Updated:", formData);
    }, [formData]);

    return (
        <Modal id="lookup-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <SelectOption
                        legend="Group Code"
                        name="group_code"
                        value={formData.group_code}
                        options={groupOptions}
                        onChange={handleChange}
                        required={true}
                    />

                    <InputField
                        className="w-full"
                        legend="Description"
                        name="group_desc"
                        value={formData.group_desc}
                        onChange={handleChange}
                        disabled={true}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-full"
                        legend="Label"
                        name="label"
                        value={formData.label}
                        onChange={handleChange}
                        required={true}
                    />

                    <InputField
                        className="w-full"
                        legend="Value"
                        name="value"
                        label="Cannot be changed later"
                        value={formData.value}
                        onChange={handleChange}
                        required={true}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        className="w-full"
                        legend="Order Index"
                        name="order_index"
                        type="number"
                        value={formData.order_index?.toString() || ""}
                        onChange={handleChange}
                    />

                    <Checkbox
                        legend="Is Hidden"
                        name="is_hidden"
                        checked={formData.is_hidden || false}
                        onChange={handleCheckboxChange}
                    />
                </div>

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

export default LookupFormModal;