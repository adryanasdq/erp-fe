import DataTable, { type TableHeaders } from "@/components/datatable";
import type { IEmployee } from "@/models/types/hr/employee"

interface EmployeeTableProps {
    data: IEmployee[];
    pageSize: number;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, pageSize }) => {
    const headers: TableHeaders[] = [
        {
            title: "ID",
            align: "left",
            minWidth: 20
        },
        {
            title: "Status",
            align: "left",
            minWidth: 20
        },
        {
            title: "Join Date",
            align: "left",
            minWidth: 20
        },
        {
            title: "Manager ID",
            align: "left",
            minWidth: 20
        },
        {
            title: "Position ID",
            align: "left",
            minWidth: 20
        },
        {
            title: "Name",
            align: "left",
            minWidth: 20
        },
        {
            title: "Modified Date",
            align: "left",
            minWidth: 20
        }
    ];

    return (
        <DataTable
            headers={headers}
            data={data}
            pageSize={pageSize}
        />
    )
}

export default EmployeeTable;