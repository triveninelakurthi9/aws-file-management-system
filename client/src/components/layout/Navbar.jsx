import { Bell, UserCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      <div className="flex flex-col">

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-slate-500 text-sm">
          Welcome back, {user?.name || "User"} 👋
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">

          <Bell
            size={24}
            className="text-slate-600 hover:text-blue-600 transition"
          />

          <span
            className="
              absolute
              -top-1
              -right-1
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
          />

        </button>

        <button
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            hover:bg-slate-50
            transition
          "
        >

          <UserCircle2
            size={36}
            className="text-blue-600"
          />

          <div className="text-left">

            <p className="font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email || ""}
            </p>

          </div>

        </button>

      </div>

    </header>
  );
}

export default Navbar;