'use client';
import ChatWrapper from '../../components/Chat/ChatWrapper';
import { ChatSidebar } from '../../components/ChatSidebar/ChatSidebar';
import { ChatProvider } from '../../context/ChatContext';

export default function Index() {
  return (
    <ChatProvider>
      <div className="bg-[#F3F7FB] w-screen h-screen ">
        <div className="flex justify-between items-center gap-2">
          <div className="w-[350px] max-w-[350px] min-w-[350px] h-screen p-4">
            <ChatSidebar />
          </div>
          <div className="w-full max-w-[1440px] m-auto h-screen p-4">
            <ChatWrapper />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}
