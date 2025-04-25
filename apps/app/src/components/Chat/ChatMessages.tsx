'use client';
import { useChat } from '../../context/ChatContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const mockMessages = [
  {
    role: 'user',
    content: 'Želim kupiti dionice BH Telecoma, koja je trenutna cijena?',
    timestamp: new Date(),
    userImage: 'https://github.com/edisdev.png',
  },
  {
    role: 'assistant',
    content:
      'Trenutna cijena dionice BH Telecoma (BHTSR) na Sarajevskoj berzi je 12.80 KM. U posljednjih mjesec dana, cijena se kretala između 12.50 KM i 13.20 KM. Da li želite da vam pomognem oko procesa kupovine?',
    timestamp: new Date(),
  },
  {
    role: 'user',
    content: 'Da, želim kupiti 100 dionica. Koji je proces?',
    timestamp: new Date(),
    userImage: 'https://github.com/edisdev.png',
  },
  {
    role: 'assistant',
    content:
      'Za kupovinu 100 dionica BH Telecoma, proces je sljedeći:\n\n1. Potrebno je da otvorite račun kod brokerske kuće\n2. Položite novac na račun (približno 1,280 KM za dionice + provizija)\n3. Postavite nalog za kupovinu\n\nŽelite li da vam pomognem oko odabira brokerske kuće?',
    timestamp: new Date(),
  },
];

function ChatMessages() {
  const { activeChat, messages } = useChat();

  return (
    <div className="h-[94%] max-w-[80%] m-auto py-8">
      <div className="h-full overflow-scroll">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isFollowedByAI = mockMessages[index + 1]?.role === 'assistant';

          return (
            <div
              key={index}
              className={`${!isUser && 'ml-10'} ${
                isFollowedByAI ? 'mb-2' : 'mb-8'
              }`}
            >
              {isUser ? (
                <div className="flex gap-4 items-center">
                  <img
                    src={message.userImage}
                    alt="User"
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex justify-between items-center w-full">
                    <p className="text-xs text-gray-600">{message.content}</p>
                    <div className="flex items-center gap-1">
                      <span
                        style={{ fontSize: 18 }}
                        className="material-icons-outlined text-gray-400 cursor-pointer hover:text-gray-600 transition-all hover:scale-110 duration-300"
                      >
                        edit
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="">
                  <p className="text-xs text-[#5661F6] flex items-center gap-1 pb-1 font-light">
                    SASE A.I +
                    <div className="border border-[#5661F6] w-3 flex items-center justify-center h-3 rounded-full">
                      <span
                        style={{ fontSize: 8 }}
                        className="material-icons-outlined  rotate-[-125deg] text-[#5661F6]"
                      >
                        west
                      </span>
                    </div>
                  </p>

                  <p className="text-xs text-gray-600 whitespace-pre-line">
                    <ReactMarkdown
                      children={message.content}
                      remarkPlugins={[remarkGfm]}
                    />
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatMessages;
