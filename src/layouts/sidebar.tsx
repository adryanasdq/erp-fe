import { useState } from "react";
import { Outlet } from "react-router";

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside
                className={`bg-white shadow-lg w-64 p-6 fixed top-0 left-0 h-full transform transition-transform duration-200 z-30
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">ERP System</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-gray-600 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>
                <nav className="space-y-4">
                    <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Dashboard</a>
                    <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Employees</a>
                    <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Finance</a>
                    <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Sales</a>
                    <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Inventory</a>
                </nav>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
                />
            )}

            <div className="flex-1 md:ml-64">
                {/* Topbar */}
                <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden text-gray-600 focus:outline-none"
                    >
                        ☰
                    </button>
                    <div className="flex items-center gap-4 w-full justify-end">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                        <button className="relative">
                            <span className="material-icons text-gray-600">notifications</span>
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">3</span>
                        </button>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="font-medium text-gray-700">John Doe</span>
                        </div>
                    </div>
                </header>

                <Outlet />
            </div>
        </div >
    )
}

export default SideBar;