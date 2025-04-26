'use client';
import { useChat } from '../../context/ChatContext';

export function ChatList() {
  const { chats, activeChat, setActiveChat } = useChat();

  return (
    <div className="h-full px-6 overflow-scroll relative">
      <div className="flex h-full flex-col gap-1 pt-2">
        {chats.map((chat) => {
          return (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`py-3 flex transition-all duration-300 items-center group gap-2 px-4 cursor-pointer ${
                activeChat === chat.id
                  ? 'bg-[#EEF0FE] rounded-full'
                  : 'hover:translate-x-1 '
              }`}
            >
              <span
                style={{ fontSize: 18 }}
                className={`material-icons-outlined ${
                  activeChat === chat.id
                    ? 'text-[#5661F6]'
                    : 'group-hover:text-[#5661F6]'
                }`}
              >
                sms
              </span>
              <p
                className={`text-sm truncate ${
                  activeChat === chat.id
                    ? 'text-[#5661F6]'
                    : 'group-hover:text-[#5661F6]'
                }`}
              >
                {chat.title}
              </p>
            </div>
          );
        })}

        {chats.length === 0 && (
          <div className="pt-10 flex items-center flex-col gap-2">
            <span className="material-icons-round text-gray-400">
              announcement
            </span>
            <p className="text-gray-400 text-xs text-center">
              Trenutno nema razgovora.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
