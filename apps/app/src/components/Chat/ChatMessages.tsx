'use client';
import { useChat } from '../../context/ChatContext';
import Omco from '../../images/omco.jpeg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

interface AIMessageProps {
  content: string;
  isLoading: boolean;
  isLastUserMessage: boolean;
}

const AIMessage = ({
  content,
  isLoading,
  isLastUserMessage,
}: AIMessageProps) => (
  <div className={isLastUserMessage ? 'ml-10' : ''}>
    <div className="text-sm text-[#5661F6] flex items-center gap-1 pb-1 font-light">
      SASE A.I +
      <div className="border border-[#5661F6] w-3 flex items-center justify-center h-3 rounded-full">
        <span
          style={{ fontSize: 8 }}
          className="material-icons-outlined rotate-[-125deg] text-[#5661F6]"
        >
          west
        </span>
      </div>
    </div>

    {isLoading ? (
      <div className="flex items-center gap-2 text-sm text-gray-500 pt-2">
        <div className="animate-pulse flex space-x-1">
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    ) : (
      <div className="text-sm text-gray-600 whitespace-pre-line">
        <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
      </div>
    )}
  </div>
);

function ChatMessages() {
  const { messages, isLoading } = useChat();

  return (
    <div className="h-[99%] max-w-[80%]  m-auto py-8 relative ">
      <div className="absolute bottom-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#F3F7FB] via-[#F3F7FB] to-transparent pointer-events-none w-full h-[80px]"></div>
      <div className="h-full overflow-scroll">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isFollowedByAI = messages[index + 1]?.role === 'assistant';
          const isLastUserMessage = index === messages.length - 1 && isUser;
          const hasAIResponse =
            !isLastUserMessage || (isUser && isFollowedByAI);

          return (
            <div
              key={index + 'chatmessage'}
              className={
                !isFollowedByAI
                  ? 'border-b border-gray-200 last:border-b-0  mb-4 last:mb-10 '
                  : ''
              }
            >
              <div
                key={index}
                className={`b ${!isUser && 'ml-10'} ${
                  isFollowedByAI ? 'mb-2' : 'mb-4'
                }`}
              >
                {isUser ? (
                  <div className="flex gap-4 items-center group">
                    <Image
                      width={128}
                      height={128}
                      src={Omco}
                      alt="User"
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex justify-between items-center w-full">
                      <p className="text-sm text-gray-600 group-hover:underline">
                        {message.content}
                      </p>
                      <div className="flex items-center gap-1 group-hover:flex hidden">
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
                  <AIMessage
                    content={message.content}
                    isLoading={false}
                    isLastUserMessage={isLastUserMessage}
                  />
                )}
              </div>

              {isLastUserMessage && isLoading && (
                <AIMessage
                  content=""
                  isLoading={true}
                  isLastUserMessage={isLastUserMessage}
                />
              )}

              <div
                className={
                  hasAIResponse && !isFollowedByAI
                    ? 'flex ml-10 pb-4 items-center justify-between'
                    : 'hidden'
                }
              >
                <div className="flex items-center gap-2">
                  <div className="w-[100px] bg-white rounded-full h-6 gap-2 flex items-center justify-center cursor-pointer">
                    <span
                      className="material-icons-outlined text-gray-400 hover:text-blue-500 transition-all duration-300"
                      style={{ fontSize: 14 }}
                    >
                      thumb_up
                    </span>

                    <div className="w-[1px] h-[60%] bg-gray-200" />
                    <span
                      className="material-icons-outlined text-gray-400 hover:text-red-500 transition-all duration-300"
                      style={{ fontSize: 14 }}
                    >
                      thumb_down
                    </span>

                    <div className="w-[1px] h-[60%] bg-gray-200" />

                    <span
                      className="material-icons-outlined text-gray-400 hover:text-blue-500 transition-all duration-300"
                      style={{ fontSize: 12 }}
                    >
                      content_copy
                    </span>
                  </div>
                  <div className="w-6 bg-white rounded-full h-6 flex items-center justify-center cursor-pointer">
                    <span
                      className="material-icons-outlined text-gray-400 hover:text-blue-500 transition-all duration-300"
                      style={{ fontSize: 18 }}
                    >
                      more_vert
                    </span>
                  </div>
                </div>

                <div className="h-6 rounded-full px-2 bg-white flex items-center gap-1 group cursor-pointer">
                  <span
                    className="material-icons-outlined text-gray-600 group-hover:rotate-[90deg] transition-all duration-300"
                    style={{ fontSize: 14 }}
                  >
                    change_circle
                  </span>
                  <p className="text-xs text-gray-600">Regenerate</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatMessages;
