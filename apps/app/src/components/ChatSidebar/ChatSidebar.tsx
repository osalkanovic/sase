'use client';

import { ChatList } from './ChatList';
import { ChatSettings } from './ChatSettings';
import { ChatSidebarTop } from './ChatSidebarTop';
import { useChat } from '../../context/ChatContext';

export function ChatSidebar() {
  const { addChat, deleteAllChats, chats } = useChat();

  return (
    <div
      className="bg-white h-full rounded-[30px]"
      style={{ boxShadow: '0px 0px 10px 0px #a3a3a314' }}
    >
      <div className="flex flex-col h-full relative">
        <ChatSidebarTop
          numberOfConversations={chats.length}
          onNewChat={addChat}
          onClearAll={deleteAllChats}
        />
        <ChatList />

        <div className="px-6">
          <ChatSettings />
        </div>
      </div>
    </div>
  );
}
