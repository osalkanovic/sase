const stocks = [
  {
    name: 'BH Telecom',
    symbol: 'BHTSR',
    amount: 200,
    value: '300 KM',
  },
  {
    name: 'Sarajevo Osiguranje',
    symbol: 'SOSOR',
    amount: 150,
    value: '450 KM',
  },
  {
    name: 'Bosnalijek',
    symbol: 'BSNLR',
    amount: 80,
    value: '720 KM',
  },
  {
    name: 'Energoinvest',
    symbol: 'ENISR',
    amount: 50,
    value: '110 KM',
  },
];

function BrokerAccount() {
  return (
    <div className="h-full">
      <div className="flex flex-col">
        <div className="flex items-center flex-col justify-center">
          <p className="text-base tracking-[1px] text-gray-400 font-[300]">
            Balans
          </p>
          <p className="text-2xl font-[600] text-gray-800">3000 KM</p>
        </div>

        <div className="w-[90%] mx-auto h-[1px] mt-4 mb-4 bg-gray-200"></div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <p className="text-gray-500 text-sm group-hover:text-blue-500">
              Dodaj novac
            </p>
            <span className="material-icons-round text-gray-500 group-hover:text-blue-500">
              credit_score
            </span>
          </div>

          <div className="w-[2px] h-[20px] bg-gray-200" />
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <p className="text-gray-500 text-sm group-hover:text-blue-500">
              Isplata
            </p>
            <span className="material-icons-round text-gray-500 group-hover:text-blue-500">
              request_page
            </span>
          </div>

          <div className="w-[2px] h-[20px] bg-gray-200" />
          <div className="flex items-center justify-center gap-2 group cursor-pointer">
            <p className="text-gray-500 text-sm group-hover:text-blue-500">
              Osjveži
            </p>
            <span className="material-icons-round text-gray-500 group-hover:text-blue-500 group-active:rotate-[420deg] transition-all duration-500">
              refresh
            </span>
          </div>
        </div>

        <div className="flex items-center flex-col justify-center mt-10">
          <p className="text-base tracking-[1px] text-gray-400 font-[300]">
            Lista dionica
          </p>
          <div className="flex flex-col w-full gap-0 mt-2 bg-gray-100 p-2 rounded-lg   border border-gray-200">
            {stocks.map((stock, idx) => (
              <div
                className={`flex items-center justify-between ${
                  idx !== 0 ? 'mt-2' : ''
                }`}
                key={stock.symbol}
              >
                <div className="flex items-center justify-center gap-2">
                  <p className="text-blue-500 font-[500] text-sm min-w-[130px]">
                    {stock.name}
                  </p>
                  <div className="w-[2px] h-[20px] bg-gray-200" />
                  <p className="text-gray-500 text-xs min-w-[40px] text-start">
                    {stock.symbol}
                  </p>
                  <div className="w-[2px] h-[20px] bg-gray-200" />
                  <p className="text-gray-500 text-xs min-w-[70px] text-start">
                    {stock.amount} Dionica
                  </p>
                  <div className="w-[2px] h-[20px] bg-gray-200" />
                  <p className="text-gray-500 text-xs">{stock.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrokerAccount;
