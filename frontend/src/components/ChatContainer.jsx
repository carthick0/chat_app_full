import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import defaultPic from "../assets/avatar.png"
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
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-gray-900">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;

          return (
            <div key={message._id} className={`flex ${isSender ? "justify-end" : "justify-start"} items-end`}>
              
              {/* Receiver (Left side) - Profile Pic FIRST, Then Message */}
              {!isSender && (
                <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden mr-2">
                  <img
                    src={selectedUser.profilePic || defaultPic}
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Message Container */}
              <div className={`flex flex-col ${isSender ? "items-end" : "items-start"}`}>
                {/* Message Bubble */}
                <div
                  className={`relative px-4 py-2 max-w-xs sm:max-w-md rounded-lg shadow-md text-sm ${
                    isSender
                      ? "bg-blue-500 text-white rounded-br-none" // Blue bubble for sender
                      : "bg-gray-200 text-gray-900 rounded-bl-none" // Gray bubble for recipient
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[250px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                {/* Time below message */}
                <span className={`text-xs mt-1 ${isSender ? "text-blue-300 text-right" : "text-gray-500 text-left"}`}>
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>

              {/* Sender (Right side) - Profile Pic AFTER Message */}
              {isSender && (
                <div className="w-10 h-10 rounded-full border border-gray-300 overflow-hidden ml-2">
                  <img
                    src={authUser.profilePic ||defaultPic}
                    alt="profile pic"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Auto-scroll reference */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
