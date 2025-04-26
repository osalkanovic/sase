'use client';
import { useState } from 'react';
import Drawer from './Drawer';
import BrokerAccount from './BrokerAccount';

function BrokerDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div>
      <div className="fixed top-0 bottom-0 right-[-60px] flex items-center justify-center z-[999]">
        <div
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`-rotate-90 bg-[#5661F6] ${
            isDrawerOpen
              ? 'mr-[440px] hover:translate-x-1'
              : 'hover:-translate-x-1 mr-[10px]'
          } flex items-center justify-center gap-2 h-[48px]  w-[130px] rounded-tl-[20px] rounded-tr-[20px] cursor-pointer active:opacity-80 transition-all duration-300`}
        >
          <span
            className="material-icons-round text-white -translate-y-0.5"
            style={{ fontSize: 20 }}
          >
            wallet
          </span>
          <span className="text-sm text-white -translate-y-0.5">Portfolio</span>
        </div>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Portfolio"
      >
        <BrokerAccount isDrawerOpen={isDrawerOpen} />
      </Drawer>
    </div>
  );
}

export default BrokerDrawer;
