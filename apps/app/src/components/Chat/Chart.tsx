import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { addDays, parseISO, formatISO } from 'date-fns';
function generateRandomHexColor() {
  return (
    '#' +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, '0')
  );
}
export function fixChartData(data: any[]) {
  if (data.length === 0) return [];

  const filledData = [];

  let currentDate = parseISO(data[0].x);
  const lastDate = parseISO(data[data.length - 1].x);

  let lastClose = data[0].y[3];
  let dataIndex = 0;

  while (currentDate <= lastDate) {
    const currentDateStr = formatISO(currentDate, { representation: 'date' });

    if (data[dataIndex]) {
      const entryDateStr = formatISO(parseISO(data[dataIndex].x), {
        representation: 'date',
      });

      if (currentDateStr === entryDateStr) {
        const fixedEntry = {
          x: data[dataIndex].x,
          y: [
            lastClose, // open
            data[dataIndex].y[1], // high
            data[dataIndex].y[2], // low
            data[dataIndex].y[3], // close
          ],
        };
        filledData.push(fixedEntry);
        lastClose = fixedEntry.y[3];
        dataIndex++;
      } else {
        filledData.push({
          x: new Date(currentDate).toISOString(),
          y: [lastClose, lastClose, lastClose, lastClose],
        });
      }
    } else {
      filledData.push({
        x: new Date(currentDate).toISOString(),
        y: [lastClose, lastClose, lastClose, lastClose],
      });
    }

    currentDate = addDays(currentDate, 1);
  }

  return filledData;
}

export function Chart({ data }: { data: any }) {
  const [state, setState] = useState<any>({
    series: [],
    options: {},
    seriesBar: [],
    optionsBar: {},
  });
  const [news, setNews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getChartData = async () => {
    setIsLoading(true);
    const sp = new URLSearchParams();
    sp.set('symbol', data.ticker);
    sp.set('fromDate', data.fromDate);
    sp.set('toDate', data.toDate);

    const res = await axios.get(
      `http://localhost:3001/api/sase-api/chart?${sp.toString()}`
    );
    // const newsRes = await axios.get(`http://localhost:3001/api/news`);
    const chartData = res.data[0];

    const fixedCandleData = fixChartData(
      chartData.dataProvider.map((item: any) => ({
        x: new Date(item.Date).toISOString(),
        y: [item.open, item.high, item.low, item.close],
      }))
    );

    const volumeData = chartData.dataProvider.map((item: any) => ({
      x: new Date(item.Date).toISOString(),
      y: item.Volume ?? 0,
    }));

    setState({
      series: [
        {
          data: fixedCandleData,
        },
      ],
      options: {
        // grid: {
        //   show: true,
        //   padding: { left: 0, right: 0, top: 100, bottom: 0 },
        // },
        chart: {
          type: 'candlestick',
          height: 400,
          id: 'candles',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        plotOptions: {},
        xaxis: {
          type: 'datetime',
        },
        // annotations: {
        //   xaxis: newsRes.data.map((article: any, index: number) => {
        //     const color = generateRandomHexColor();
        //     return {
        //       x: new Date(article.date).getTime(),
        //       borderColor: color,
        //       label: {
        //         borderColor: color,
        //         style: {
        //           fontSize: '12px',
        //           color: '#fff',
        //           background: color,
        //         },
        //         orientation: 'horizontal',
        //         offsetY: -1 * (0 + (index % 3) * 20),
        //         text: article.text,
        //       },
        //     };
        //   }),
        // },
      },
      seriesBar: [
        {
          name: 'Volume',
          data: volumeData,
        },
      ],

      optionsBar: {
        chart: {
          height: 160,
          type: 'bar',
          brush: {
            enabled: true,
            target: 'candles',
          },
          selection: {
            enabled: true,
            xaxis: {
              min:
                volumeData.length > 0
                  ? new Date(volumeData[0].x).getTime()
                  : undefined,
              max:
                volumeData.length > 0
                  ? new Date(volumeData[volumeData.length - 1].x).getTime()
                  : undefined,
            },
            fill: {
              color: '#ccc',
              opacity: 0.4,
            },
            stroke: {
              color: '#0D47A1',
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            // colors: {
            //   ranges: [
            //     {
            //       from: -1000,
            //       to: 0,
            //       color: '#F15B46',
            //     },
            //     {
            //       from: 1,
            //       to: 10000,
            //       color: '#FEB019',
            //     },
            //   ],
            // },
          },
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            offsetX: 13,
          },
        },
        yaxis: {
          labels: {
            show: true,
          },
        },
      },
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getChartData();
  }, []);

  console.log(state, 'state');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="candlestick"
            height={290}
          />
        </div>
        <div id="chart-bar">
          <ReactApexChart
            options={state.optionsBar}
            series={state.seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </div>
    </div>
  );
}
