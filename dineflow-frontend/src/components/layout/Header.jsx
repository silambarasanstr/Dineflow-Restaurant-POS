import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-16 shrink-0 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-5">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* Page Title */}
          <div className="hidden sm:block">
            <h2 className="text-sm font-semibold text-gray-900">
              Restaurant POS
            </h2>

            <p className="text-[11px] text-gray-400">Manage your restaurant</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Search */}
          <div className="hidden md:flex w-56 items-center rounded-lg border border-gray-200 bg-gray-50 px-3 focus-within:border-gray-300 focus-within:bg-white">
            <Search size={16} className="shrink-0 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent px-2 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Mobile Search */}
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
          >
            <Search size={19} />
          </button>

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <Bell size={19} />

            {/* Notification Badge */}
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-7 w-px bg-gray-200 sm:block" />

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-50"
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                A
              </div>

              {/* User Info */}
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-gray-800">Admin</p>

                <p className="text-[10px] text-gray-400">Administrator</p>
              </div>

              <ChevronDown
                size={15}
                className="hidden text-gray-400 sm:block"
              />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <>
                {/* Outside Click */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />

                <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
                  {/* User Header */}
                  <div className="border-b border-gray-100 px-3 py-2.5">
                    <p className="text-xs font-semibold text-gray-800">Admin</p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      admin@dineflow.com
                    </p>
                  </div>

                  {/* Profile */}
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="flex w-full items-center cursor-pointer gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <User size={15} />
                    Profile
                  </button>

                  {/* Settings */}
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <Settings size={15} />
                    Settings
                  </button>

                  {/* Logout */}
                  <div className="my-1 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
