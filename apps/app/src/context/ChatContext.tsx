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
  isChatLoading: boolean;
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
  'Kupovina dionica Bosnalijeka',

  'Financijski izvještaji BH Telecoma',
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
  const [isChatLoading, setIsChatLoading] = useState(false);
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
    getChatMessages();
    setMessages([
      // {
      //   role: 'assistant',
      //   timestamp: new Date(),
      //   userImage: '',
      //   content:
      //     '```chart {"fromDate": "28.10.2024", "toDate": "26.04.2025", "ticker": "ENISR"}```',
      // },
      // {
      //   role: 'assistant',
      //   timestamp: new Date(),
      //   userImage: '',
      //   content:
      //     'Evo pregleda performansi najboljih kompanija na Sarajevskoj berzi u zadnjih 30 dana, uključujući financijske izvještaje:\n\n### BH Telecom (BHTSR)\n- **Prihodi iz ugovora s kupcima**: \n  - Trenutna godina: 528,325,078 KM\n  - Prethodna godina: 505,223,267 KM\n- **Dobit iz redovnog poslovanja**:\n  - Trenutna godina: 65,842,371 KM\n  - Prethodna godina: 48,003,561 KM\n- **Ukupni rezultat**:\n  - Trenutna godina: 62,790,293 KM\n  - Prethodna godina: 46,551,759 KM\n- **Osnovna zarada po dionici**:\n  - Trenutna godina: 1.04 KM\n  - Prethodna godina: 0.76 KM\n\n### Bosnalijek (BSNLR)\n- **Dobit iz redovnog poslovanja**: \n  - Trenutna godina: 14,194,979 KM\n  - Prethodna godina: 11,505,114 KM\n- **Ukupni prihodi**:\n  - Trenutna godina: 186,631,422 KM\n  - Prethodna godina: 187,310,908 KM\n- **Poslovni rashodi**:\n  - Trenutna godina: 153,023,471 KM\n  - Prethodna godina: 143,027,999 KM\n\n### Energoinvest d.d. Sarajevo (ENISR)\n- **Prihodi iz ugovora s kupcima**: \n  - Trenutna godina: 178,161,512 KM\n  - Prethodna godina: 194,799,315 KM\n- **Neto dobit**:\n  - Trenutna godina: 47,997,117 KM\n  - Prethodna godina: 46,623,706 KM\n- **Ukupni rezultat**:\n  - Trenutna godina: 624,942 KM\n  - Prethodna godina: 633,552 KM\n\n### Chartovi\nZa vizualni prikaz performansi, evo grafikona za svaku kompaniju u zadnjih 30 dana:\n\n- BH Telecom: ```chart {"fromDate": "27.03.2025", "toDate": "26.04.2025", "ticker": "BHTSR"}```\n- Bosnalijek: ```chart {"fromDate": "27.03.2025", "toDate": "26.04.2025", "ticker": "BSNLR"}```\n- Energoinvest: ```chart {"fromDate": "27.03.2025", "toDate": "26.04.2025", "ticker": "ENISR"}```\n\nAko trebate dodatne informacije ili specifične izračune, slobodno mi se obratite!',
      // },
    ]);
  }, [activeChat]);

  const getChatMessages = async () => {
    setIsChatLoading(true);
    const res = await axios.get(
      `http://localhost:3001/api/chat/history/${activeChat}`
    );
    setMessages(
      res.data
        .map((message: any) => ({
          role: message.role,
          content: message.content[0].text.value,
          timestamp: new Date(),
        }))
        .reverse()
    );
    console.log(res.data, 'chat history');
    setIsChatLoading(false);
  };

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

    // AUTOMATSKI UPDATE NASLOVA
    const chat = chats.find((c) => c.id === activeChat);
    if (chat && chat.messages.length === 0 && activeChat) {
      const shortTitle = message.split(' ').slice(0, 8).join(' ');
      updateChatTitle(
        activeChat,
        shortTitle.length > 40 ? shortTitle.slice(0, 40) + '...' : shortTitle
      );
    }

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
        isChatLoading,
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
