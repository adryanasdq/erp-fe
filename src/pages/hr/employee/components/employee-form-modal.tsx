import { useEffect, useState } from "react";

import InputField from "@/components/input-field";
import Modal from "@/components/modal"
import SelectOption from "@/components/select-option";

import { DefaultEmployee } from "@/models/schema/hr/employee";


const EmployeeFormModal = () => {
    const [formData, setFormData] = useState(DefaultEmployee);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted Data:');
        console.log(formData);
        setFormData(DefaultEmployee);
    }

    const closeModal = () => {
        (document.getElementById('emp-form') as HTMLDialogElement).close();
    };

    return (
        <Modal id="emp-form" title="Employee Form">
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
                        options={[
                            { value: 'staff', label: 'Staff' },
                            { value: 'manager', label: 'Manager' },
                            { value: 'director', label: 'Director' },
                        ]}
                        onChange={handleChange}
                    />

                    <SelectOption
                        legend="Manager"
                        name="manager_id"
                        options={[
                            { value: 'john_doe', label: 'John Doe' },
                            { value: 'jane_smith', label: 'Jane Smith' },
                            { value: 'alice_johnson', label: 'Alice Johnson' },
                        ]}
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

                <button type="submit" onClick={closeModal}>Add</button>
            </form>
        </Modal>
    )
}

export default EmployeeFormModal;