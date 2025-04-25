import { useState } from 'react';
import { useChat } from '../../context/ChatContext';
import sendIcon from '../../images/send.png';
import Image from 'next/image';

function ChatInput() {
  const { sendMessage, isLoading, messages } = useChat();
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
    <div
      className={`absolute transition-all duration-300 left-0 right-0  ${
        messages.length === 0 ? 'bottom-[42%]' : 'bottom-4'
      } flex flex-col items-center justify-center`}
    >
      {messages.length === 0 && (
        <div className="mb-6">
          <h1 className="text-gray-500 text-[30px] font-[600]">
            Kako vam mogu pomoći?
          </h1>
        </div>
      )}
      <div
        className={`bg-white flex  flex-col transition-all duration-300 overflow-hidden  ${
          messages.length === 0
            ? 'h-[90px] rounded-[25px] items-start justify-center'
            : 'h-full rounded-full items-center justify-between'
        } w-[60%] px-1`}
        style={{ boxShadow: '1px 1px 6px 0px #52525224' }}
      >
        <div className="w-full flex items-center justify-center py-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            disabled={isLoading}
            placeholder="Šta želiš danas kupiti?"
            className={`w-full transition-all duration-300 bg-transparent ${
              messages.length === 0 ? 'translate-y-1 ml-1' : 'h-[38.4px]'
            } outline-none text-sm placeholder:text-gray-400 text-gray-600 px-4`}
          />

          {messages.length > 0 ? (
            <div
              className={`max-h-[80%] transition-all duration-300 h-[34.4px] mr-1 group aspect-square ${
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
          ) : (
            ''
          )}
        </div>

        {messages.length === 0 ? (
          <div className="w-full flex items-center justify-center pl-2 pr-2 pb-2 translate-y-2">
            <div className="w-full h-full flex justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`max-h-[80%] px-2 transition-all hover:opacity-80 active:opacity-75 flex items-center gap-1 duration-300 h-[38.4px] group border border-gray-200 rounded-full flex items-center cursor-pointer justify-center`}
                  onClick={() => alert('Predefinisana poruka 1')}
                >
                  <div className="hover:opacity-80 active:opacity-80 transition-all duration-300 flex items-center justify-center">
                    <span
                      className="material-icons-round text-gray-500 "
                      style={{ fontSize: 16 }}
                    >
                      paid
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Koliko para imam?</p>
                </div>

                <div
                  className={`max-h-[80%] px-2 transition-all hover:opacity-80 active:opacity-75 flex items-center gap-1 duration-300 h-[38.4px] group border border-gray-200 rounded-full flex items-center cursor-pointer justify-center`}
                  onClick={() => alert('Predefinisana poruka 1')}
                >
                  <div className="hover:opacity-80 active:opacity-80 transition-all duration-300 flex items-center justify-center">
                    <span
                      className="material-icons-round text-gray-500 "
                      style={{ fontSize: 14 }}
                    >
                      shopping_cart
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Sta se isplati kupiti?
                  </p>
                </div>
              </div>
              <div className="flex  justify-end items-end pb-1">
                <div
                  className={`max-h-[80%] transition-all duration-300 h-[38.4px] group aspect-square ${
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
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default ChatInput;
