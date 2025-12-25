import { useEffect, useState } from "react";

import InputField from "@/components/data-input/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/data-input/select-option";

import useStore from "@/models/stores";
import { DefaultEmployee } from "@/models/schema/human-resource/employee";
import { IEmployee } from "@/models/types/human-resource/employee";

interface IEmployeeFormModalProps {
    mode: string;
    selectedEmployee?: IEmployee;
}


const EmployeeFormModal: React.FC<IEmployeeFormModalProps> = ({
    mode,
    selectedEmployee
}) => {
    const employees = useStore((state) => state.employees);
    const positions = useStore((state) => state.positions);
    const empStatusOptions = useStore((state) => state.lookupItems);
    const isSubmitting = useStore((state) => state.isEmployeeLoading);
    const createEmployee = useStore((state) => state.createEmployee);
    const updateEmployee = useStore((state) => state.updateEmployee);
    const fetchEmployees = useStore((state) => state.fetchEmployees);
    const [formData, setFormData] = useState(DefaultEmployee);

    useEffect(() => {
        if (mode === "edit" && selectedEmployee) {
            setFormData(selectedEmployee);
        } else {
            setFormData(DefaultEmployee);
        }
    }, [mode, selectedEmployee]);

    const positionOptions = positions.map((pos) => ({
        value: pos.id,
        label: pos.title
    }));

    const managerOptions = employees.map((emp) => ({
        value: emp.id,
        label: emp.name
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
                const response = await createEmployee(formData);
            } else {
                if (formData.id) {
                    const response = await updateEmployee(formData);
                }
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }

        await fetchEmployees();
        setFormData(DefaultEmployee);
        closeModal();
    }

    const closeModal = () => {
        (document.getElementById('emp-form') as HTMLDialogElement).close();
    };

    const getModalTitle = () => {
        if (mode === "new") return "Create Employee Data";
        if (mode === "edit") return "Edit Employee Data";

        return "Employee Form";
    }

    const getButtonLabel = () => {
        if (mode === "new") return "Add";
        if (mode === "edit") return "Update";

        return "Submit";
    }

    return (
        <Modal id="emp-form" title={getModalTitle()}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <InputField
                    className="w-full"
                    legend="Name"
                    name="name"
                    value={formData.name}
                    required={true}
                    placeholder="Input employee name"
                    onChange={handleChange}
                />

                <div className="flex gap-4">
                    <SelectOption
                        legend="Position"
                        name="position_id"
                        value={formData.position_id}
                        required={true}
                        options={positionOptions}
                        onChange={handleChange}
                    />

                    <SelectOption
                        legend="Manager"
                        name="manager_id"
                        value={formData.manager_id}
                        options={managerOptions}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        legend="Join Date"
                        type="date"
                        name="hire_date"
                        value={formData.hire_date.toString()}
                        onChange={handleChange}
                    />

                    <SelectOption
                        legend="Status"
                        name="status"
                        value={formData.status}
                        options={empStatusOptions}
                        onChange={handleChange}
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

export default EmployeeFormModal;