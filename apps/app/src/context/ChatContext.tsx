'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
interface Chat {
  id: string;
  title: string;
  messages: Array<{
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }>;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  userImage: string;
}

interface ChatContextType {
  chats: Chat[];
  isLoading: boolean;
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  addChat: () => void;
  deleteAllChats: () => void;
  deleteChat: (id: string) => void;
  updateChatTitle: (id: string, title: string) => void;
  sendMessage: (message: string) => void;
  messages: Message[];
  addMessage: (
    chatId: string,
    content: string,
    role: 'user' | 'assistant'
  ) => void;
}

const initialChats: Chat[] = [
  'Kupovina dionica BH Telecoma',
  'Interes za nekretnine u Sarajevu',
  'Upit za kupovinu poljoprivrednog zemljišta',
  'Tražim investiciju u IT sektor',
  'Kupovina komercijalnih prostora',
  'Interes za hotel u Mostaru',
  'Upit za kupovinu rudarskih prava',
  'Tražim investiciju u obnovljive izvore',
  'Kupovina dionica Energoinvesta',
  'Interes za trgovačke centre',
  'Upit za kupovinu šumskog zemljišta',
  'Tražim investiciju u turizam',
  'Kupovina dionica Raiffeisen Banke',
  'Interes za industrijske hale',
  'Upit za kupovinu poljoprivredne opreme',
  'Tražim investiciju u proizvodnju',
  'Kupovina dionica ASA Osiguranja',
  'Interes za apartmane na moru',
  'Upit za kupovinu vinograda',
  'Tražim investiciju u edukaciju',
  'Kupovina dionica Uniqa osiguranja',
  'Interes za poslovne zgrade',
  'Upit za kupovinu poljoprivrednih proizvoda',
  'Tražim investiciju u zdravstvo',
  'Kupovina dionica Sparkasse Banke',
  'Interes za turističke komplekse',
  'Upit za kupovinu poljoprivrednih strojeva',
  'Tražim investiciju u transport',
  'Kupovina dionica ASA Preventa',
  'Interes za stambene zgrade',
].map((title, index) => ({
  id: (Date.now() - index * 1000).toString(), // Ensuring unique IDs
  title,
  messages: [
    {
      content: `Početna poruka za ${title.toLowerCase()}`,
      role: 'user',
      timestamp: new Date(Date.now() - index * 1000),
    },
  ],
}));

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(
    initialChats[0]?.id || null
  );

  const addChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `New chat br. ${chats.length + 1}`,
      messages: [],
    };
    setChats([newChat, ...chats]);
    setActiveChat(newChat.id);
  };

  const deleteAllChats = () => {
    setChats([]);
    setActiveChat(null);
  };

  const deleteChat = (id: string) => {
    setChats(chats.filter((chat) => chat.id !== id));
    if (activeChat === id) {
      setActiveChat(chats[0]?.id || null);
    }
  };

  const updateChatTitle = (id: string, title: string) => {
    setChats(chats.map((chat) => (chat.id === id ? { ...chat, title } : chat)));
  };

  useEffect(() => {
    setIsLoading(false);
    setMessages([]);
  }, [activeChat]);

  const sendMessage = async (message: string) => {
    setMessages((messages) => [
      ...messages,
      {
        role: 'user',
        content: message,
        timestamp: new Date(),
        userImage: 'https://github.com/edisdev.png',
      },
    ]);
    setIsLoading(true);
    const res = await axios.post('http://localhost:3001/api/chat', {
      chatId: activeChat,
      message: message,
    });
    setMessages((messages) => [
      ...messages,
      {
        role: 'assistant',
        content: res.data.output,
        timestamp: new Date(),
        userImage: '',
      },
    ]);
    setIsLoading(false);
    console.log(res);
  };

  const addMessage = (
    chatId: string,
    content: string,
    role: 'user' | 'assistant'
  ) => {
    setChats(
      chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { content, role, timestamp: new Date() },
              ],
            }
          : chat
      )
    );
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChat,
        setActiveChat,
        addChat,
        deleteAllChats,
        deleteChat,
        updateChatTitle,
        addMessage,
        sendMessage,
        messages,
        isLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
