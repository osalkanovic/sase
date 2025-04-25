import sendIcon from '../../images/send.png';
import Image from 'next/image';

function ChatInput() {
  return (
    <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center">
      <div
        className="bg-white flex justify-between items-center overflow-hidden rounded-full h-12 w-[60%] px-1"
        style={{ boxShadow: '1px 1px 6px 0px #52525224' }}
      >
        <input
          type="text"
          placeholder="Šta želiš danas kupiti?"
          className="w-full h-full outline-none bg-transparent text-sm placeholder:text-gray-400 text-gray-600 px-4"
        />

        <div className="h-[80%] group aspect-square bg-[#5661F6] rounded-full flex items-center cursor-pointer justify-center">
          <Image
            src={sendIcon}
            alt="send"
            className="w-[50%] -ml-0.5 -mb-0.5 group-hover:scale-110 transition-all duration-300 group-hover:opacity-90 group-acitve:scale-120 "
            width={128}
            height={128}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
