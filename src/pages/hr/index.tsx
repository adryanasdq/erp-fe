const HRPage = () => {
    return (
        <main className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-sm text-gray-500">Revenue</h3>
                    <p className="text-2xl font-semibold text-indigo-600">$120,540</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-sm text-gray-500">Employees</h3>
                    <p className="text-2xl font-semibold text-green-600">320</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-sm text-gray-500">Expenses</h3>
                    <p className="text-2xl font-semibold text-red-600">$45,230</p>
                </div>
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-sm text-gray-500">Projects</h3>
                    <p className="text-2xl font-semibold text-purple-600">12</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b text-gray-600">
                            <th className="pb-2">Date</th>
                            <th className="pb-2">Description</th>
                            <th className="pb-2">Amount</th>
                            <th className="pb-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="py-2">2025-09-12</td>
                            <td>Invoice #12345</td>
                            <td className="text-green-600">+$2,300</td>
                            <td><span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Paid</span></td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="py-2">2025-09-10</td>
                            <td>Purchase Order #9876</td>
                            <td className="text-red-600">-$1,200</td>
                            <td><span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs">Pending</span></td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="py-2">2025-09-08</td>
                            <td>Subscription Renewal</td>
                            <td className="text-red-600">-$450</td>
                            <td><span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">Paid</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default HRPage;