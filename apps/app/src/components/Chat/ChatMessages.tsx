'use client';
import { useChat } from '../../context/ChatContext';
import Omco from '../../images/omco.jpeg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const mockMessages = [
  {
    role: 'user',
    content: 'Želim kupiti dionice BH Telecoma, koja je trenutna cijena?',
    timestamp: new Date(),
    userImage: Omco,
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
    userImage: Omco,
  },
  {
    role: 'assistant',
    content:
      'Za kupovinu 100 dionica BH Telecoma, proces je sljedeći:\n\n1. Potrebno je da otvorite račun kod brokerske kuće\n2. Položite novac na račun (približno 1,280 KM za dionice + provizija)\n3. Postavite nalog za kupovinu\n\nŽelite li da vam pomognem oko odabira brokerske kuće?',
    timestamp: new Date(),
  },
  {
    role: 'user',
    content: 'Da, koje brokerske kuće preporučujete?',
    timestamp: new Date(),
    userImage: Omco,
  },
  {
    role: 'assistant',
    content:
      'Nekoliko pouzdanih brokerskih kuća u BiH su:\n\n1. Raiffeisen Bank - jedna od najvećih i najstabilnijih\n2. SEE Investment Solutions - specijalizirani za trgovanje na domaćem tržištu\n3. Eurohaus - dugogodišnje iskustvo na tržištu kapitala\n\nPreporučujem Raiffeisen zbog:\n- Najniže provizije (0.5%)\n- Online trading platforme\n- Jednostavnog otvaranja računa\n\nŽelite li detaljnije informacije o nekoj od ovih kuća?',
    timestamp: new Date(),
  },
  {
    role: 'user',
    content: 'Može za Raiffeisen, kako da otvorim račun kod njih?',
    timestamp: new Date(),
    userImage: Omco,
  },
  {
    role: 'assistant',
    content:
      'Za otvaranje brokerskog računa u Raiffeisen banci potrebno je:\n\n1. Lična dokumenta (lična karta ili pasoš)\n2. Tekući račun (može se otvoriti u isto vrijeme ako ga nemate)\n3. Popuniti obrazac za otvaranje brokerskog računa\n\nMožete to uraditi na dva načina:\n1. Online kroz Raiffeisen Internet bankarstvo\n2. Lično u najbližoj poslovnici\n\nNakon otvaranja računa, dobićete pristup njihovoj trading platformi. Želite li da vam objasnim kako da postavite prvi nalog za kupovinu?',
    timestamp: new Date(),
  },
  {
    role: 'user',
    content: 'Da, kako da postavim nalog za kupovinu?',
    timestamp: new Date(),
    userImage: Omco,
  },
  {
    role: 'assistant',
    content:
      'Evo koraka za postavljanje naloga za kupovinu:\n\n1. Prijavite se na Raiffeisen trading platformu\n2. Odaberite simbol BHTSR (BH Telecom)\n3. Kliknite na "Nova kupovina"\n4. Unesite:\n   - Količinu: 100 dionica\n   - Cijenu: možete staviti trenutnu tržišnu (12.80 KM) ili limit cijenu\n   - Tip naloga: "Market" za trenutnu cijenu ili "Limit" za određenu cijenu\n5. Potvrdite nalog\n\nNalog će biti aktivan do izvršenja ili isteka (standardno 30 dana). Želite li da vam objasnim različite tipove naloga?',
    timestamp: new Date(),
  },
];

function ChatMessages() {
  const { activeChat, messages } = useChat();

  return (
    <div className="h-[94%] max-w-[80%] m-auto py-8  pb-0">
      <div className="h-full overflow-scroll">
        {messages.map((message, index) => {
          const isUser = message.role === 'user';
          const isFollowedByAI = mockMessages[index + 1]?.role === 'assistant';

          return (
            <div
              key={index + 'chatmessage'}
              className={
                !isFollowedByAI
                  ? 'border-b border-gray-200 last:border-b-0  mb-4'
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
                    <img
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      src={message?.userImage?.src}
                      alt="User"
                      className="w-6 h-6 rounded-full"
                    />
                    <div className="flex justify-between items-center w-full">
                      <p className="text-xs text-gray-600 group-hover:underline">
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
                  <div className="">
                    <div className="text-xs text-[#5661F6] flex items-center gap-1 pb-1 font-light">
                      SASE A.I +
                      <div className="border border-[#5661F6] w-3 flex items-center justify-center h-3 rounded-full">
                        <span
                          style={{ fontSize: 8 }}
                          className="material-icons-outlined  rotate-[-125deg] text-[#5661F6]"
                        >
                          west
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 whitespace-pre-line">
                      <ReactMarkdown
                        children={message.content}
                        remarkPlugins={[remarkGfm]}
                      />
                    </p>
                  </div>
                )}
              </div>

              <div
                className={
                  !isFollowedByAI
                    ? 'flex ml-10  pb-4 items-center justify-between'
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
