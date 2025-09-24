import DataTable from "../../components/datatable";
import { Employee } from "../../api/mock/_employee";

const HRPage = () => {

    return (
        <DataTable
            columns={[
                { header: "ID" },
                { header: "Name" },
                { header: "Age" },
            ]}
            data={Employee}
        />


    );
}

export default HRPage;