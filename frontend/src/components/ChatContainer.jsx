import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-start gap-3 ${
                message.senderId === authUser._id ? "justify-end" : "justify-start"
              }`}
              ref={messageEndRef}
            >
              {/* Profile Image */}
              <div className="w-10 h-10 rounded-full border overflow-hidden">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-xs px-4 py-2 rounded-lg text-white ${
                  message.senderId === authUser._id
                    ? "bg-blue-500"
                    : "bg-gray-500"
                }`}
              >
                {/* Image Message */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-md mb-2"
                  />
                )}
                {/* Text Message */}
                {message.text && <p>{message.text}</p>}
                {/* Timestamp */}
                <time className="text-xs text-gray-200 block text-right mt-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
