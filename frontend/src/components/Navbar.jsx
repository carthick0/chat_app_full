import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  console.log("check...");
  return (
    <header
      className="border-b border-gray-200 fixed w-full top-0 z-50 
      backdrop-blur-lg bg-opacity-90 shadow-sm bg-indigo-600"
    >
      <div className="container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-80 transition-all"
        >
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-wide text-white">Chatty</h1>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="btn btn-sm btn-outline flex items-center gap-2 hover:bg-primary/20 transition-all"
          >
            <Settings className="w-6 h-6 text-white" />
            <span className="hidden sm:inline text-white w-6 h-6 pr-13">
              Settings
            </span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-sm btn-outline flex items-center gap-2 hover:bg-primary/20 transition-all"
              >
                <User className="w-6 h-6 text-white " />
                <span className="hidden sm:inline text-white w-6 h-6 pr-13">
                  Profile
                </span>
              </Link>

              <button
                className="btn btn-sm flex items-center gap-2 text-red-500 hover:bg-red-100 hover:text-red-600 transition-all"
                onClick={logout}
              >
                <LogOut className="w-6 h-6" />
                <span className="hidden sm:inline ">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
