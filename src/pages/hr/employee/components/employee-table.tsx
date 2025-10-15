import DataTable, { type TableHeaders } from "@/components/datatable";
import type { IEmployee } from "@/models/types/hr/employee"

interface EmployeeTableProps {
    data: IEmployee[];
    pageSize: number;
    onEdit?: (empId: string) => void;
    onDelete?: (empId: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
    data,
    pageSize,
    onEdit,
    onDelete
}) => {
    const headers: TableHeaders<IEmployee>[] = [
        {
            key: "id",
            title: "ID",
            align: "left",
            minWidth: 20
        },
        {
            key: "status",
            title: "Status",
            align: "left",
            minWidth: 20
        },
        {
            key: "hire_date",
            title: "Hire Date",
            align: "left",
            minWidth: 20
        },
        {
            key: "manager_id",
            title: "Manager ID",
            align: "left",
            minWidth: 20
        },
        {
            key: "position_id",
            title: "Position ID",
            align: "left",
            minWidth: 20
        },
        {
            key: "name",
            title: "Name",
            align: "left",
            minWidth: 20
        },
        {
            key: "modified_date",
            title: "Modified Date",
            align: "left",
            minWidth: 20,
            render: (row) => new Date(row.modified_date).toLocaleDateString()
        }
    ];

    return (
        <DataTable
            headers={headers}
            data={data}
            pageSize={pageSize}
            isEditable={true}
            isDeletable={true}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    )
}

export default EmployeeTable;