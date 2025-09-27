import DataTable from "../../components/datatable";
import { Employee } from "../../api/mock/_employee";

const HRPage = () => {

    return (
        <>
            <DataTable
                headers={["ID", "Name", "Position"]}
                data={Employee}
            />
        </>
    );
}

export default HRPage;