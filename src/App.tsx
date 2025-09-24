import { useNavigate } from "react-router";
import { Users, DollarSign, ShoppingCart, Package, Briefcase, Settings } from "lucide-react";

function App() {
  const modules = [
    { title: "Admin", icon: Users, path: "/admin", color: "text-blue-500" },
    { title: "Finance", icon: DollarSign, path: "/finance", color: "text-green-500" },
    { title: "Sales", icon: ShoppingCart, path: "/sales", color: "text-orange-500" },
    { title: "Inventory", icon: Package, path: "/inventory", color: "text-purple-500" },
    { title: "HR", icon: Briefcase, path:"/hr", color: "text-pink-500" },
    { title: "Settings", icon: Settings, path:"/setting", color: "text-gray-500" },
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
              <Icon className={`w-12 h-12 mb-4 ${m.color}`} />
              <span className="text-lg font-medium text-gray-700">{m.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App
