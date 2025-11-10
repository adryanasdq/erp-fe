import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores/index";
import { IDepartment } from "@/models/types/hr/department";

import DepartmentTable from "./components/department-table";
import EmployeeFormModal from "./components/department-form-modal";


const DepartmentPage = () => {
    const data = useStore((state) => state.departments);
    const fetchDepartments = useStore((state) => state.fetchDepartments);
    const deleteDepartment = useStore((state) => state.deleteDepartment);

    const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredDepartments = useMemo(() => {
        return data.filter((emp) => {
            return emp.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [data, searchText])

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (deptId: string) => {
        const dept = data.find((e) => e.id === deptId) || null;

        setSelectedDepartment(dept);
        setFormDialogMode("edit");
        (document.getElementById("dept-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (deptId: string) => {
        if (confirm("Are you sure want to delete this department?")) {
            deleteDepartment(deptId);
        }

        await fetchDepartments();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("dept-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <EmployeeFormModal
                mode={formDialogMode}
                selectedDepartment={selectedDepartment}
            />

            <div className="text-4xl mt-4 mb-8">Department</div>

            <DepartmentTable
                data={filteredDepartments}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default DepartmentPage;