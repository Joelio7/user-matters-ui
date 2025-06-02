import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/constants";
import { LayoutDashboard, Users, FileText, UserCircle } from "lucide-react";

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: ROUTES.DASHBOARD, icon: LayoutDashboard },
    ...(user?.role === "admin"
      ? [{ name: "Customers", href: ROUTES.CUSTOMERS, icon: Users }]
      : []),
    { name: "Matters", href: ROUTES.MATTERS, icon: FileText },
    { name: "Profile", href: ROUTES.PROFILE, icon: UserCircle },
  ];

  return (
    <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
