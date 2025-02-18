import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import defaultImage from "../assets/avatar.png";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-3 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={selectedUser.profilePic || defaultImage}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {selectedUser.fullName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {onlineUsers.includes(selectedUser._id) ? "Online 🟢" : "Offline ⚫"}
            </p>
          </div>
        </div>

        {/* Close Chat Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="cursor-pointer" size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
