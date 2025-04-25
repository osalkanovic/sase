import Image from 'next/image';
import Omco from '../../images/omco.jpeg';

export function ChatSettings() {
  return (
    <div className="w-full flex flex-col gap-4 pb-6 pt-4 ">
      <button className="rounded-full border border-gray-200 text-sm flex items-center p-1 gap-2 hover:opacity-90 active:opacity-80 group">
        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="material-icons-outlined " style={{ fontSize: 16 }}>
            settings
          </span>
        </div>
        <p className="group-hover:text-[#5661F6] transition-all duration-200 group-hover:translate-x-1">
          Settings
        </p>
      </button>

      <button className="rounded-full border border-gray-200 text-sm flex items-center p-1 gap-2 hover:opacity-90 active:opacity-80 group">
        <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
          <Image
            src={Omco}
            alt="Omer Salkanovic"
            width={24}
            height={24}
            className="rounded-full w-full h-full"
          />
        </div>
        <p className="group-hover:text-[#5661F6] transition-all duration-200 group-hover:translate-x-1">
          Omer Salkanovic
        </p>
      </button>
    </div>
  );
}
