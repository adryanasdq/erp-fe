import { useEffect, useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";
import TextAreaField from "@/components/data-input/text-area";

import useStore from "@/models/stores";
import { DefaultPosition } from "@/models/schema/hr/position";
import { IPosition } from "@/models/types/hr/position";

interface IPositionFormModalProps {
    mode: string;
    selectedPosition?: IPosition;
}


const PositionFormModal: React.FC<IPositionFormModalProps> = ({
    mode,
    selectedPosition
}) => {
    const departments = useStore((state) => state.departments);
    const isSubmitting = useStore((state) => state.isLoading);
    const createPosition = useStore((state) => state.createPosition);
    const updatePosition = useStore((state) => state.updatePosition);
    const fetchDepartments = useStore((state) => state.fetchDepartments);
    const fetchPositions = useStore((state) => state.fetchPositions);
    const [formData, setFormData] = useState(DefaultPosition);

    useEffect(() => {
        if (mode === "edit" && selectedPosition) {
            setFormData(selectedPosition);
        } else {
            setFormData(DefaultPosition);
        }
    }, [mode, selectedPosition]);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    const departmentOptions = departments.map((pos) => ({
        value: pos.id,
        label: pos.name
    }));

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
                const response = await createPosition(formData);
            } else {
                if (formData.id) {
                    const response = await updatePosition(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchPositions();
        setFormData(DefaultPosition);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('pos-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create Position Data";
        if (mode === "edit") return "Edit Position Data";

        return "Position Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="pos-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <InputField
                        className="w-full"
                        legend="Title"
                        name="title"
                        value={formData.title}
                        required={true}
                        placeholder="Input title"
                        onChange={handleChange}
                    />

                    <SelectOption
                        legend="Department"
                        name="department_id"
                        value={formData.department_id}
                        required={true}
                        options={departmentOptions}
                        onChange={handleChange}
                    />
                </div>

                <TextAreaField
                    className="w-full"
                    legend="Description"
                    name="description"
                    value={formData.description}
                    required={false}
                    placeholder="Input description"
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

export default PositionFormModal;