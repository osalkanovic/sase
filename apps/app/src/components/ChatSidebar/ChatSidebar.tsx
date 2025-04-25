'use client';

import { ChatList } from './ChatList';
import { ChatSettings } from './ChatSettings';
import { ChatSidebarTop } from './ChatSidebarTop';
import { useChat } from '../../context/ChatContext';

export function ChatSidebar() {
  const { addChat, deleteAllChats } = useChat();

  return (
    <div
      className="bg-white h-full rounded-[30px]"
      style={{ boxShadow: '0px 0px 10px 0px #a3a3a314' }}
    >
      <div className="flex flex-col h-full relative">
        <ChatSidebarTop onNewChat={addChat} onClearAll={deleteAllChats} />
        <ChatList />

        <div className="px-6">
          <ChatSettings />
        </div>
      </div>
    </div>
  );
}

export const defaultChats = [
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
];
