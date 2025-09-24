import { Search, Bell, User } from "lucide-react";
import { Outlet } from "react-router";

const Navbar = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">ERP</h1>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search modules..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Notifications">
                        <Bell className="w-5 h-5 text-gray-600" />
                    </button>

                    <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100" aria-label="Profile">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Adryan</span>
                    </button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar;