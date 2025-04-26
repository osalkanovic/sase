interface ChatSidebarTopProps {
  onNewChat: () => void;
  onClearAll: () => void;
  numberOfConversations: number;
}

export function ChatSidebarTop({
  onNewChat,
  onClearAll,
  numberOfConversations,
}: ChatSidebarTopProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="pt-6 pl-6 pr-6">
        <p className="text-[24px] font-[500] tracking-[5px]">SASE AI</p>
      </div>

      <div className="px-6 flex items-center gap-2 pt-6">
        <button
          onClick={onNewChat}
          className="bg-[#5661F6] rounded-full w-full p-2.5 text-white flex items-center justify-center gap-2 hover:opacity-90 active:opacity-80 text-sm font-light"
        >
          <span
            className="material-icons-round text-white"
            style={{ fontSize: 18 }}
          >
            add
          </span>
          Novi razgovor
        </button>

        <div className="h-10 min-w-10 w-10 bg-black flex items-center justify-center rounded-full cursor-pointer hover:opacity-90 active:opacity-80 user-select-none">
          <span
            className="material-icons-round text-white"
            style={{ fontSize: 22 }}
          >
            search
          </span>
        </div>
      </div>

      <div className="border-t border-b border-gray-200 w-full py-4 px-6 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          Your conversations{' '}
          <span className="text-gray-600">({numberOfConversations})</span>
        </p>

        {numberOfConversations > 0 && (
          <p
            onClick={onClearAll}
            className="text-xs  text-[#5661F6] cursor-pointer hover:opacity-90 active:opacity-80"
          >
            Obriši sve
          </p>
        )}
      </div>
    </div>
  );
}
