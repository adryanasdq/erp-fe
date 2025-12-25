import { useEffect, useMemo, useState } from "react";

import useStore from "@/models/stores/index";
import { IEmployee } from "@/models/types/human-resource/employee";

import EmployeeSummary from "./components/employee-summary";
import EmployeeTable from "./components/employee-table";
import EmployeeFormModal from "./components/employee-form-modal";


const EmployeePage = () => {
    const data = useStore((state) => state.employees);
    const fetchData = useStore((state) => state.fetchEmployees);
    const deleteEmployee = useStore((state) => state.deleteEmployee);
    const fetchPositions = useStore((state) => state.fetchPositions);
    const fetchEmpStatus = useStore((state) => state.fetchLookupItemsByGroupCode)

    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
    const [formDialogMode, setFormDialogMode] = useState<"new" | "edit" | "view">("new");
    const [searchText, setSearchText] = useState("");

    const filteredEmployee = useMemo(() => {
        return data.filter((emp) => {
            return emp.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [data, searchText])

    useEffect(() => {
        fetchData();
    }, [fetchData])

    useEffect(() => {
        fetchPositions();
    }, [fetchPositions])

    useEffect(() => {
        fetchEmpStatus("EMP_STATUS");
    }, [fetchEmpStatus])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handleEdit = (empId: string) => {
        const emp = data.find((e) => e.id === empId) || null;

        setSelectedEmployee(emp);
        setFormDialogMode("edit");
        (document.getElementById("emp-form") as HTMLDialogElement).showModal();
    }

    const handleDelete = async (empId: string) => {
        if (confirm("Are you sure want to delete this employee?")) {
            deleteEmployee(empId);
        }

        await fetchData();
    }

    const openModal = () => {
        setFormDialogMode("new");
        (document.getElementById("emp-form") as HTMLDialogElement).showModal();
    }

    return (
        <>
            <EmployeeFormModal
                mode={formDialogMode}
                selectedEmployee={selectedEmployee}
            />

            <div className="text-4xl mt-4 mb-8">Employee</div>
            <EmployeeSummary
                totalEmployees={data.length}
                activeEmployees={data.filter((emp) => emp.status.toLowerCase() === "active").length}
            />

            <EmployeeTable
                data={filteredEmployee}
                openModal={openModal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                searchText={searchText}
                handleSearch={handleSearch}
            />
        </>
    );
}

export default EmployeePage;