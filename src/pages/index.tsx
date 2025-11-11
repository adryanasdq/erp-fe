import { useNavigate } from "react-router";
import { Users, DollarSign, ShoppingCart, Package, Briefcase, Settings } from "lucide-react";

function App() {
  const modules = [
    { title: "Admin", icon: Users, path: "/admin", color: "bg-blue-500" },
    { title: "Finance", icon: DollarSign, path: "/finance", color: "bg-green-500" },
    { title: "Sales", icon: ShoppingCart, path: "/sales", color: "bg-orange-500" },
    { title: "Inventory", icon: Package, path: "/inventory", color: "bg-purple-500" },
    { title: "HR", icon: Briefcase, path:"/hr", color: "bg-pink-500" },
    { title: "Settings", icon: Settings, path:"/setting", color: "bg-gray-500" },
  ];

  const navigate = useNavigate();

  const handleModuleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {modules.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.title}
              className="group cursor-pointer rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-lg hover:-translate-y-1 duration-200 flex flex-col items-center"
              onClick={() => handleModuleClick(m.path)}
            >
              <div className={`${m.color} flex items-center justify-center rounded-xl p-3 mb-4`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <span className="text-lg font-medium text-gray-700">{m.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App
