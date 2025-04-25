import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import sendIcon from '../../images/send.png';
import Image from 'next/image';

function ChatInput() {
  const { sendMessage, isLoading } = useChat();
  const [message, setMessage] = useState('');

  const submit = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center">
      <div
        className="bg-white flex justify-between items-center overflow-hidden rounded-full h-12 w-[60%] px-1"
        style={{ boxShadow: '1px 1px 6px 0px #52525224' }}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          disabled={isLoading}
          placeholder="Šta želiš danas kupiti?"
          className="w-full h-full outline-none bg-transparent text-sm placeholder:text-gray-400 text-gray-600 px-4"
        />

        <div
          className={`h-[80%] group aspect-square ${
            message.trim() ? 'bg-[#5661F6]' : 'bg-gray-200'
          } rounded-full flex items-center cursor-pointer justify-center`}
          onClick={submit}
        >
          <Image
            src={sendIcon}
            alt="send"
            className="w-[50%] -ml-0.5 -mb-0.5 group-hover:scale-110 transition-all duration-300 group-hover:opacity-90 group-acitve:scale-120"
            width={128}
            height={128}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
