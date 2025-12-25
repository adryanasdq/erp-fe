import { Users, UserCheck, Palmtree, RockingChair } from "lucide-react"

interface EmployeeSummaryProps {
    totalEmployees?: number;
    activeEmployees?: number;
    onLeaveEmployees?: number;
    retiredEmployees?: number;
}


const EmployeeSummary: React.FC<EmployeeSummaryProps> = ({
    totalEmployees,
    activeEmployees,
    onLeaveEmployees,
    retiredEmployees
}) => {
    return (
        <div className="flex justify-between mb-12">
            <div className="card w-60 bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="card-title text-2xl">{totalEmployees}</h2>
                            <p># Employee(s)</p>
                        </div>
                        <Users size={48} />
                    </div>
                </div>
            </div>
            <div className="card w-60 bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="card-title text-2xl">{activeEmployees}</h2>
                            <p>Active</p>
                        </div>
                        <UserCheck size={48} />
                    </div>
                </div>
            </div>
            <div className="card w-60 bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="card-title text-2xl">12</h2>
                            <p>On Leave</p>
                        </div>
                        <Palmtree size={48} />
                    </div>
                </div>
            </div>
            <div className="card w-60 bg-base-100 card-md shadow-sm">
                <div className="card-body">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="card-title text-2xl">167</h2>
                            <p>Retired</p>
                        </div>
                        <RockingChair size={48} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeSummary;