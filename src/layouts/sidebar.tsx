import { useState } from "react";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex flex-col">
            <header className="flex items-center justify-between bg-white shadow px-4 py-2 sticky top-0 z-20">
                <div className="flex items-center gap-2">
                    <button
                        className="p-2 rounded hover:bg-gray-100"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-xl">ERP</span>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-full px-4 py-1 w-64 focus:outline-none focus:ring"
                    />
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside
                    className={`bg-white shadow-md transition-all duration-300 ease-in-out 
          ${sidebarOpen ? "w-60" : "w-0"} overflow-hidden`}
                >
                    <nav className="flex flex-col p-4 gap-2">
                        <a href="#" className="p-2 hover:bg-gray-100 rounded">Home</a>
                        <a href="#" className="p-2 hover:bg-gray-100 rounded">Trending</a>
                        <a href="#" className="p-2 hover:bg-gray-100 rounded">Subscriptions</a>
                        <a href="#" className="p-2 hover:bg-gray-100 rounded">Library</a>
                    </nav>
                </aside>

                <Outlet />
            </div>
        </div >
    )
}

export default SideBar;