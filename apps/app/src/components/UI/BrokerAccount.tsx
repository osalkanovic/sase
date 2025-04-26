'use client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function BrokerAccount({ isDrawerOpen }: { isDrawerOpen: boolean }) {
  const [data, setData] = useState({
    userBalance: '0',
    stocks: {},
  });

  const getData = async () => {
    const res = await axios.get(
      'http://localhost:3001/api/stocks/user-balance'
    );

    setData(res.data);
  };

  const formatCurrency = (value: string | number) => {
    const num =
      typeof value === 'string'
        ? parseFloat(value.replace(/[^0-9.,-]/g, '').replace(',', '.'))
        : value;
    // Ručno formatiranje: 1.234,56 KM
    return `${num.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} KM`;
  };

  useEffect(() => {
    getData();
  }, [isDrawerOpen]);

  return (
    <div className="h-full">
      <div className="flex flex-col">
        <div className="flex items-center flex-col justify-center">
          <p className="text-base tracking-[1px] text-gray-400 font-[300]">
            Balans
          </p>
          <p className="text-2xl font-[600] text-gray-800">
            {formatCurrency(data.userBalance)}
          </p>
        </div>

        <div className="w-[90%] mx-auto h-[1px] mt-4 mb-4 bg-gray-200"></div>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/historija"
            target="_blank"
            className="flex items-center justify-center gap-2 group cursor-pointer"
          >
            <p className="text-gray-500 text-sm group-hover:text-blue-500">
              Historija
            </p>
            <span
              className="material-icons-round text-gray-500 group-hover:text-blue-500"
              style={{ fontSize: 20 }}
            >
              history
            </span>
          </Link>

          <div className="w-[2px] h-[20px] bg-gray-200" />
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <p className="text-gray-500 text-sm group-hover:text-blue-500">
              Isplata
            </p>
            <span
              style={{ fontSize: 20 }}
              className="material-icons-round text-gray-500 group-hover:text-blue-500"
            >
              request_page
            </span>
          </div>

          <div className="w-[2px] h-[20px] bg-gray-200" />
          <div
            onClick={() => getData()}
            className="flex items-center justify-center gap-2 group cursor-pointer"
          >
            <p className="text-gray-500 text-sm group-hover:text-blue-500">
              Osjveži
            </p>
            <span
              style={{ fontSize: 20 }}
              className="material-icons-round text-gray-500 group-hover:text-blue-500 group-active:rotate-[420deg] transition-all duration-500"
            >
              refresh
            </span>
          </div>
        </div>

        <div className="flex items-center flex-col justify-center mt-10">
          <p className="text-base tracking-[1px] text-gray-400 font-[300]">
            Lista dionica
          </p>
          <div className="flex flex-col w-full gap-2 mt-4 max-w-[90%] overflow-auto">
            {Object.keys(data.stocks).map((stock, idx) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              const stockData = data.stocks[stock];

              return (
                <div
                  className={`flex items-center justify-between`}
                  key={stock}
                >
                  <div className="flex relative items-center border border-gray-100 bg-gray-50 flex-col rounded-lg p-2 w-full  justify-center gap-4">
                    {/* <p className="text-gray-500 text-sm"> {stockData.name}</p> */}
                    <Image
                      src={stockData.logo}
                      alt={stockData.name}
                      className="h-14 object-contain pt-1 pb-2"
                      width={100}
                      height={100}
                    />

                    <div className="flex gap-1 w-full justify-between px-4">
                      <div className="flex flex-col items-center w-1/3 gap-1">
                        <p className="text-xs text-gray-400">Simbol</p>
                        <p className="text-gray-600 text-base">{stock}</p>
                      </div>

                      <div className="flex flex-col items-center w-1/3 gap-1">
                        <p className="text-xs text-gray-400">Količina</p>
                        <p className="text-gray-600 text-lg">
                          {stockData.amount}
                        </p>
                      </div>

                      <div className="flex flex-col items-center w-1/3 gap-1">
                        <p className="text-xs text-gray-400">Vrijednost</p>
                        <p className="text-gray-600 text-base">
                          {stockData.value}
                        </p>
                      </div>
                    </div>

                    {/* {stockData.name}
                    {stock}
                    {stockData.amount}
                    {stockData.value} */}
                  </div>
                </div>
              );
            })}

            {Object.keys(data.stocks).length === 0 && (
              <p className="text-gray-500 text-sm text-center py-4">
                Nemate dionice u portfelju
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerAccount;
