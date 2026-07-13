import {
  LayoutDashboard,
  Folder,
  Upload,
  HardDrive,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "My Files",
      icon: <Folder size={20} />,
      path: "/files",
    },
    {
      name: "Upload",
      icon: <Upload size={20} />,
      path: "/upload",
    },
    {
      name: "Storage",
      icon: <HardDrive size={20} />,
      path: "/storage",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200 flex flex-col">

      <div className="px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-600">
          ☁ CloudDrive
        </h1>

        <p className="text-sm text-slate-500 mt-2">
          Secure Cloud Storage
        </p>
      </div>

      <nav className="flex-1 px-5">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-5 py-4 mb-3 transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {menu.icon}
            <span className="font-medium">
              {menu.name}
            </span>
          </NavLink>
        ))}
      </nav>

      <div className="p-5">

        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-4
            rounded-xl
            px-5
            py-4
            text-red-500
            hover:bg-red-50
            transition
          "
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;