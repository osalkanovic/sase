'use client';
import BrokerDrawer from '../UI/BrokerDrawer';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

function ChatWrapper() {
  return (
    <div className=" mr-6 h-full relative">
      <BrokerDrawer />
      <ChatMessages />
      <ChatInput />
    </div>
  );
}

export default ChatWrapper;
