'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { bs } from 'date-fns/locale';

function HistoryWrapper() {
  const [data, setData] = useState<any[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const getData = async () => {
    const res = await axios.get('http://localhost:3001/api/stocks/history');
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    if (key === 'date') {
      return direction === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    return direction === 'asc'
      ? a[key] > b[key]
        ? 1
        : -1
      : a[key] < b[key]
      ? 1
      : -1;
  });

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: string) => {
    // if (!sortConfig || sortConfig.key !== key) return '';
    return null;
    // return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="p-4 bg-[#F3F7FB] h-screen">
      <div className="overflow-x-auto mx-auto mt-10 bg-white border border-gray-100 rounded-lg max-w-[1000px]">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('date')}
              >
                Datum {getSortIcon('date')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('symbol')}
              >
                Simbol {getSortIcon('symbol')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('action')}
              >
                Akcija {getSortIcon('action')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('price')}
              >
                Cijena {getSortIcon('price')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('amount')}
              >
                Količina {getSortIcon('amount')}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('price')}
              >
                Ukupno {getSortIcon('price')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {format(new Date(item.date), 'dd.MM.yyyy HH:mm', {
                    locale: bs,
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm  text-gray-400">
                  {item.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.action === 'buy'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.action === 'buy' ? 'KUPOVINA' : 'PRODAJA'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {item.price.toFixed(2)} KM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {item.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {(item.price * item.amount).toFixed(2)} KM
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoryWrapper;
