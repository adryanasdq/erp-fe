import { useEffect, useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"

import useStore from "@/models/stores";
import { DefaultDepartment } from "@/models/schema/human-resource/department";
import { IDepartment } from "@/models/types/human-resource/department";
import TextAreaField from "@/components/data-input/text-area";

interface IDepartmentFormModalProps {
    mode: string;
    selectedDepartment?: IDepartment;
}


const DepartmentFormModal: React.FC<IDepartmentFormModalProps> = ({
    mode,
    selectedDepartment
}) => {
    const isSubmitting = useStore((state) => state.isDepartmentLoading);
    const createDepartment = useStore((state) => state.createDepartment);
    const updateDepartment = useStore((state) => state.updateDepartment);
    const fetchDepartments = useStore((state) => state.fetchDepartments);
    const [formData, setFormData] = useState(DefaultDepartment);

    useEffect(() => {
        if (mode === "edit" && selectedDepartment) {
            setFormData(selectedDepartment);
        } else {
            setFormData(DefaultDepartment);
        }
    }, [mode, selectedDepartment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                const response = await createDepartment(formData);
            } else {
                if (formData.id) {
                    const response = await updateDepartment(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchDepartments();
        setFormData(DefaultDepartment);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('dept-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create Department Data";
        if (mode === "edit") return "Edit Department Data";

        return "Department Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="dept-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Name"
                    name="name"
                    value={formData.name}
                    required={true}
                    placeholder="Input department name"
                    onChange={handleChange}
                />

                <TextAreaField
                    className="w-full"
                    legend="Description"
                    name="description"
                    value={formData.description}
                    required={false}
                    placeholder="Input department description"
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

export default DepartmentFormModal;