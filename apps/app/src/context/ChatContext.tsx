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
  {
    id: Date.now().toString(),
    title: 'Novi razgovor',
    messages: [],
  },
  {
    id: 'chat-bht-1',
    title: 'pregled performansi najboljih kompanija na Sarajevskoj berzi',
    messages: [
      {
        role: 'user',
        content:
          'Daj mi pregled performansi najboljih kompanija na Sarajevskoj berzi u zadnjih 30 dana, uključujući postotak rasta ili pada, financijske izvjestaje i chartove',
        timestamp: new Date(),
      },
      {
        role: 'assistant',
        content:
          'Evo pregleda performansi najboljih kompanija na Sarajevskoj berzi u zadnjih 30 dana, uključujući postotak rasta ili pada, financijske izvještaje i chartove:\n\n### BH Telecom (BHTSR)\n1. **Cijene dionica:**\n   - Cijene dionica su se kretale između 13.11 KM i 13.93 KM.\n   - Početna cijena 27. septembra 2023. bila je 13.14 KM, dok je 25. oktobra 2023. cijena bila 13.24 KM.\n   - Prosječna cijena u ovom periodu iznosi približno 13.36 KM.\n   - **Postotak rasta:** Cijena dionica je porasla sa 13.14 KM na 13.24 KM, što predstavlja rast od približno 0.76%.\n\n2. **Financijski izvještaji:**\n   - Prihodi iz ugovora s kupcima za tekuću godinu iznose 528,325,078 KM, dok su prethodne godine iznosili 505,223,267 KM.\n   - Ukupni rashodi za tekuću godinu iznose 483,533,386 KM, dok su prethodne godine iznosili 477,774,138 KM.\n   - Dobit iz redovnog poslovanja prije oporezivanja za tekuću godinu iznosi 72,209,770 KM, dok je prethodne godine iznosila 52,730,152 KM.\n\n3. **Grafikon:**\n   ```chart {"fromDate": "28.03.2025", "toDate": "27.04.2025", "ticker": "BHTSR"}```\n\n### Bosnalijek (BSNLR)\n1. **Cijene dionica:**\n   - Većina dana zabilježena cijenom od 27 KM, osim 19. oktobra kada je cijena pala na 26.5 KM.\n   - Prosječna cijena dionica u ovom periodu iznosi 26.95 KM.\n\n2. **Financijski izvještaji:**\n   - Ukupni prihodi iznose 186,631,422 KM, dok su ukupni rashodi 170,584,231 KM.\n   - Dobit iz redovnog poslovanja prije oporezivanja iznosi 16,047,191 KM.\n   - Neto dobit/gubitak perioda iznosi 12,176,316 KM.\n\n3. **Grafikon:**\n   ```chart {"fromDate": "28.03.2025", "toDate": "27.04.2025", "ticker": "BSNLR"}```\n\n### Energoinvest (ENISR)\n1. **Cijene dionica:**\n   - Početna cijena 30 dana unazad (28. mart 2025): 2.64 KM\n   - Završna cijena (27. april 2025): 2.90 KM\n   - Prosječna cijena u zadnjih 30 dana: 2.72 KM\n   - **Postotak rasta:** 9.85%\n\n2. **Financijski izvještaji:**\n   - Ukupni prihodi: 182,989,590 KM\n   - Poslovni rashodi: 164,470,301 KM\n   - Dobit prije oporezivanja: 1,875,978 KM\n   - Neto kapital: 77,093,355 KM\n   - Ukupne obaveze: 107,729,437 KM\n\n3. **Grafikon:**\n   ```chart {"fromDate": "28.03.2025", "toDate": "27.04.2025", "ticker": "ENISR"}```\n\nOvi podaci pokazuju stabilan rast i pozitivne financijske rezultate za sve tri kompanije u zadnjih 30 dana.',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: 'chat-bsnl-1',
    title: 'Kupovina dionica Bosnalijeka',
    messages: [
      {
        content: 'Početna poruka za kupovina dionica bosnalijeka',
        role: 'user',
        timestamp: new Date(),
      },
    ],
  },
  {
    id: 'chat-bht-fin-1',
    title: 'Financijski izvještaji BH Telecoma',
    messages: [
      {
        content: 'Početna poruka za financijski izvještaji bh telecoma',
        role: 'user',
        timestamp: new Date(),
      },
    ],
  },
];

const mockChatHistory: Record<string, any[]> = {
  'chat-bht-1': [
    {
      role: 'user',
      content: [
        {
          text: {
            value:
              'Daj mi pregled performansi najboljih kompanija na Sarajevskoj berzi u zadnjih 30 dana, uključujući postotak rasta ili pada, financijske izvjestaje i chartove',
          },
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: {
            value:
              'Evo pregleda performansi najboljih kompanija na Sarajevskoj berzi u zadnjih 30 dana, uključujući postotak rasta ili pada, financijske izvještaje i chartove:\n\n### BH Telecom (BHTSR)\n1. **Cijene dionica:**\n   - Cijene dionica su se kretale između 13.11 KM i 13.93 KM.\n   - Početna cijena 27. septembra 2023. bila je 13.14 KM, dok je 25. oktobra 2023. cijena bila 13.24 KM.\n   - Prosječna cijena u ovom periodu iznosi približno 13.36 KM.\n   - **Postotak rasta:** Cijena dionica je porasla sa 13.14 KM na 13.24 KM, što predstavlja rast od približno 0.76%.\n\n2. **Financijski izvještaji:**\n   - Prihodi iz ugovora s kupcima za tekuću godinu iznose 528,325,078 KM, dok su prethodne godine iznosili 505,223,267 KM.\n   - Ukupni rashodi za tekuću godinu iznose 483,533,386 KM, dok su prethodne godine iznosili 477,774,138 KM.\n   - Dobit iz redovnog poslovanja prije oporezivanja za tekuću godinu iznosi 72,209,770 KM, dok je prethodne godine iznosila 52,730,152 KM.\n\n3. **Grafikon:**\n   ```chart {"fromDate": "28.03.2025", "toDate": "27.04.2025", "ticker": "BHTSR"}```\n\n### Bosnalijek (BSNLR)\n1. **Cijene dionica:**\n   - Većina dana zabilježena cijenom od 27 KM, osim 19. oktobra kada je cijena pala na 26.5 KM.\n   - Prosječna cijena dionica u ovom periodu iznosi 26.95 KM.\n\n2. **Financijski izvještaji:**\n   - Ukupni prihodi iznose 186,631,422 KM, dok su ukupni rashodi 170,584,231 KM.\n   - Dobit iz redovnog poslovanja prije oporezivanja iznosi 16,047,191 KM.\n   - Neto dobit/gubitak perioda iznosi 12,176,316 KM.\n\n3. **Grafikon:**\n   ```chart {"fromDate": "28.03.2025", "toDate": "27.04.2025", "ticker": "BSNLR"}```\n\n### Energoinvest (ENISR)\n1. **Cijene dionica:**\n   - Početna cijena 30 dana unazad (28. mart 2025): 2.64 KM\n   - Završna cijena (27. april 2025): 2.90 KM\n   - Prosječna cijena u zadnjih 30 dana: 2.72 KM\n   - **Postotak rasta:** 9.85%\n\n2. **Financijski izvještaji:**\n   - Ukupni prihodi: 182,989,590 KM\n   - Poslovni rashodi: 164,470,301 KM\n   - Dobit prije oporezivanja: 1,875,978 KM\n   - Neto kapital: 77,093,355 KM\n   - Ukupne obaveze: 107,729,437 KM\n\n3. **Grafikon:**\n   ```chart {"fromDate": "28.03.2025", "toDate": "27.04.2025", "ticker": "ENISR"}```\n\nOvi podaci pokazuju stabilan rast i pozitivne financijske rezultate za sve tri kompanije u zadnjih 30 dana.',
          },
        },
      ],
    },
  ],
  'chat-bsnl-1': [
    {
      role: 'user',
      content: [
        {
          text: {
            value: 'Da li je dobar trenutak za kupovinu dionica Bosnalijeka?',
          },
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: {
            value:
              'Bosnalijek (BSNLR) trenutno trguje po cijeni od 0.85 KM. U posljednjem kvartalu kompanija je zabilježila:\n\n- Ukupne prihode: 186,631,422 KM\n- Dobit iz redovnog poslovanja: 14,194,979 KM\n\nAnaliza pokazuje da je kompanija u stabilnom rastu, ali preporučujem da pratite tržišne trendove i konzultujete se sa finansijskim savjetnikom prije donošenja odluke.',
          },
        },
      ],
    },
  ],
  'chat-bht-fin-1': [
    {
      role: 'user',
      content: [
        {
          text: {
            value:
              'Pokaži mi financijske izvještaje BH Telecoma za posljednji kvartal',
          },
        },
      ],
    },
    {
      role: 'assistant',
      content: [
        {
          text: {
            value:
              'Evo detaljnog pregleda financijskih izvještaja BH Telecoma za posljednji kvartal:\n\n### Prihodi\n- Trenutna godina: 528,325,078 KM\n- Prethodna godina: 505,223,267 KM\n\n### Dobit\n- Dobit iz redovnog poslovanja: 65,842,371 KM\n- Ukupni rezultat: 62,790,293 KM\n\n### Pokazatelji po dionici\n- Osnovna zarada po dionici: 1.04 KM\n\nKompanija pokazuje pozitivan trend rasta u svim ključnim pokazateljima.',
          },
        },
      ],
    },
  ],
};

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
    setMessages([]);
  };

  const deleteChat = (id: string) => {
    setChats(chats.filter((chat) => chat.id !== id));
    if (activeChat === id) {
      setActiveChat(chats[0]?.id || null);
      setMessages([]);
    }
  };

  const updateChatTitle = (id: string, title: string) => {
    setChats(chats.map((chat) => (chat.id === id ? { ...chat, title } : chat)));
  };

  const sendMessage = async (message: string) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        content: message,
        timestamp: new Date(),
        userImage: 'https://github.com/edisdev.png',
      },
    ]);
    setIsLoading(true);

    // AUTOMATSKI UPDATE NASLOVA SAMO ZA PRVU PORUKU
    const chat = chats.find((c) => c.id === activeChat);
    console.log('Current chat:', chat);
    console.log('Messages length:', chat?.messages.length);
    console.log('Current messages:', messages);

    if (chat && messages.length === 0 && activeChat) {
      console.log('Updating title for first message');
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
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: res.data.output,
        timestamp: new Date(),
        userImage: '',
      },
    ]);
    setIsLoading(false);
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

  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChat) return;

      console.log('Loading messages for chat:', activeChat);

      if (mockChatHistory[activeChat]) {
        console.log('Using mock data for chat:', activeChat);
        const mockMessages = mockChatHistory[activeChat].map((message) => ({
          role: message.role,
          content: message.content[0].text.value,
          timestamp: new Date(),
          userImage:
            message.role === 'user' ? 'https://github.com/edisdev.png' : '',
        }));

        setMessages(mockMessages);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:3001/api/chat/history/${activeChat}`
        );
        setMessages(
          res.data
            .map((message: any) => ({
              role: message.role,
              content: message.content[0].text.value,
              timestamp: new Date(),
              userImage:
                message.role === 'user' ? 'https://github.com/edisdev.png' : '',
            }))
            .reverse()
        );
      } catch (error) {
        console.error('Error loading chat history:', error);
        setMessages([]);
      }
    };

    loadMessages();
  }, [activeChat]);

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
