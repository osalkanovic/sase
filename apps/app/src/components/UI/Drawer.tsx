'use client';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  width?: number;
  children?: JSX.Element;
  title?: string;
}

function Drawer({
  isOpen,
  onClose,
  width = 420,
  children,
  title = 'Missing title',
}: DrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[3px] z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed z-[9999] top-2 right-2 bottom-2 md bg-white shadow-lg rounded-[14px] z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+20px)]'
        }`}
        style={{ width: `${width}px` }}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-[600] font-inter">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>

        <div className="p-4 overflow-scroll h-[calc(100%-100px)]">
          {children}
        </div>
      </div>
    </>
  );
}

export default Drawer;
