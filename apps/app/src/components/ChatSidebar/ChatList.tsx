'use client';
import { useChat } from '../../context/ChatContext';

export function ChatList() {
  const { chats, activeChat, setActiveChat } = useChat();

  return (
    <div className="h-full px-6 overflow-scroll relative">
      <div className="flex h-full flex-col gap-2 pt-1">
        {chats.map((chat) => {
          return (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`py-3 flex items-center gap-2 px-4 cursor-pointer ${
                activeChat === chat.id ? 'bg-[#EEF0FE] rounded-full' : ''
              }`}
            >
              <span
                style={{ fontSize: 18 }}
                className={`material-icons-outlined ${
                  activeChat === chat.id ? 'text-[#5661F6]' : ''
                }`}
              >
                sms
              </span>
              <p
                className={`text-sm truncate ${
                  activeChat === chat.id ? 'text-[#5661F6]' : ''
                }`}
              >
                {chat.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
