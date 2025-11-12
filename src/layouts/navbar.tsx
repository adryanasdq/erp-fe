import { Search, Bell, User, FileText } from "lucide-react";
import { Outlet } from "react-router";

const Navbar = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-200">
                <div className="flex justify-between px-8 py-4 items-center">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center justify-center rounded-xl p-3 bg-blue-500">
                            <FileText size={24} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">ERP</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search modules..."
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        <button className="p-2 rounded-md !bg-white hover:bg-gray-100" aria-label="Notifications">
                            <Bell className="w-5 h-5 text-gray-600" />
                        </button>

                        <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 !bg-white" aria-label="Profile">
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Adryan</span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="px-8 mt-4">
                <Outlet />
            </div>
        </div>
    )
}

export default Navbar;