import ChatInput from './ChatInput';

function ChatWrapper() {
  return (
    <div className=" mr-6 h-full relative">
      <div className="fixed top-0 bottom-0 right-[-60px] flex items-center justify-center">
        <div className="-rotate-90 bg-[#5661F6] flex items-center justify-center gap-2 h-[38px] w-[150px] rounded-tl-[10px] rounded-tr-[10px] hover:-translate-x-1 cursor-pointer  active:opacity-80 transition-all duration-300">
          <span className="text-lg text-white">✨</span>
          <span className="text-sm text-white">Upgrade to Pro</span>
        </div>
      </div>
      <ChatInput />
    </div>
  );
}

export default ChatWrapper;
