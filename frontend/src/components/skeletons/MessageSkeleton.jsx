const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 opacity-60" />
          </div>

          <div className="chat-header mb-1">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded opacity-60" />
          </div>

          <div className="chat-bubble p-0">
            <div className="h-16 w-[200px] bg-gray-200 dark:bg-gray-700 rounded-lg opacity-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
