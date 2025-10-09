import { useEffect, useState } from "react";

import InputField from "@/components/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/select-option";

import useStore from "@/models/stores";
import { DefaultEmployee } from "@/models/schema/hr/employee";

interface IEmployeeFormModalProps {
    mode: string;
}


const EmployeeFormModal: React.FC<IEmployeeFormModalProps> = ({
    mode
}) => {
    const employees = useStore((state) => state.employees);
    const positions = useStore((state) => state.positions);
    const isSubmitting = useStore((state) => state.isLoading);
    const createEmployee = useStore((state) => state.createEmployee);
    const fetchEmployees = useStore((state) => state.fetchEmployees);
    const fetchPositions = useStore((state) => state.fetchPositions);
    const [formData, setFormData] = useState(DefaultEmployee);

    const positionOptions = positions.map((pos) => ({
        value: pos.id,
        label: pos.title
    }));

    const managerOptions = employees.map((emp) => ({
        value: emp.id,
        label: emp.name
    }));

    useEffect(() => {
        fetchPositions();
    }, [fetchPositions])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            hire_date: new Date(e.target.value)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === "new") {
                const response = await createEmployee(formData);
                console.log(response);
            } else {
                
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
                        required={true}
                        options={positionOptions}
                        onChange={handleChange}
                    />

                    <SelectOption
                        legend="Manager"
                        name="manager_id"
                        options={managerOptions}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex gap-4">
                    <InputField
                        legend="Join Date"
                        type="date"
                        onChange={handleDateChange}
                    />

                    <SelectOption
                        legend="Status"
                        name="status"
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                        onChange={handleChange}
                    />
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="btn mt-2"
                >
                    {getButtonLabel()}
                </button>
            </form>
        </Modal>
    )
}

export default EmployeeFormModal;