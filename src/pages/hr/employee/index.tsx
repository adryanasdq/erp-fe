import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import EmployeeSummary from "./components/employee-summary";
import DataTable from "../../../components/datatable";
import { Employee } from "../../../api/mock/_employee";

const HRPage = () => {
    const [searchText, setSearchText] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const filteredEmployee = useMemo(() => {
        return Employee.filter((emp) => {
            return emp.name.toLowerCase().includes(searchText.toLowerCase())
        });
    }, [searchText])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    const handlePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value));
    }

    return (
        <>
            <div className="text-4xl mb-4">Employee</div>
            <EmployeeSummary />
            <div className="flex justify-between mb-4">
                <button className="btn mr-2">
                    <Plus /> New
                </button>
                <label className="input mb-2">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        className="grow"
                        placeholder="Search"
                        value={searchText}
                        onChange={handleSearch}
                    />
                </label>

                <div className="flex items-center mx-4">
                    <div>Show</div>
                    <select value={pageSize} className="select mx-2" onChange={handlePageSize}>
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>100</option>
                    </select>
                    <div>entries</div>
                </div>
            </div>

            <DataTable
                headers={["ID", "Name", "Position"]}
                data={filteredEmployee}
                pageSize={pageSize}
            />
        </>
    );
}

export default HRPage;